import keys from "@/keys";
import { AccessToken, MaxInt, Page, SavedTrack, SpotifyApi, Playlist as SpotifyPlaylist, User } from "@spotify/web-api-ts-sdk";

const getPlaylist = async ({ accessToken, playlistId }: { accessToken: AccessToken; playlistId: string }) => {
  try {
    const playlist: SpotifyPlaylist = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getPlaylist(playlistId);

    return playlist;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isPlaylist = (value: any): value is SpotifyPlaylist => (value.type === "error" ? false : true);
const arePlaylists = (value: any): value is SpotifyPlaylist[] => (value.type === "error" ? false : true);

const getPlaylists = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getPlaylists");
  try {
    const total = (await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getUsersPlaylists(userId, 1)).total;

    const playlistsPromises = Array.from({ length: Math.ceil(total / 50) }, (_, i) => SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getUsersPlaylists(userId, 50, i * 50));
    const playlists = await Promise.all(playlistsPromises);
    return playlists?.map((playlist) => playlist.items).flat();
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const getPlaylistsWithPageAndLimit = async ({ accessToken, userId, page, limit }: { accessToken: AccessToken; userId: string; page: number; limit: MaxInt<50> }) => {
  console.debug("[Called]", "getPlaylists");
  try {
    const playlists = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getUsersPlaylists(userId, limit, page * limit);
    return playlists.items;
  } catch (e) {
    return [];
  }
};

const areUsers = (value: any): value is User[] => (value.type === "error" ? false : true);

const getPossibleConnections = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getPossibleConnections");
  try {
    const playlists = await getPlaylists({ accessToken, userId });
    if (!arePlaylists(playlists)) {
      return playlists;
    }
    const uniqueUserIds = new Set<string>();

    // Iterate over each playlist and add user IDs to the set
    playlists.forEach((playlist) => {
      uniqueUserIds.add(playlist.owner.id);
      playlist?.tracks?.items?.forEach((item) => {
        uniqueUserIds.add(item.added_by.id);
      });
    });
    // Remove the current user from the set
    uniqueUserIds.delete(userId);
    // Map over the unique user IDs and fetch user details
    const userPromises = Array.from(uniqueUserIds).map((ownerId) => getUser({ accessToken, userId: ownerId }));
    const users = Promise.all(userPromises);
    return users;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isUser = (value: any): value is User => (value.type === "error" ? false : true);

const getUser = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getUser");
  const user = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).users.profile(userId);
  return user;
};

const getRecentSavedTracksIdsOfCurrentUser = async ({ accessToken }: { accessToken: AccessToken }) => {
  console.debug("[Called]", "getSavedTracksOfUser");
  try {
    const uniqueTracks = new Set<string>();
    const total = (await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).currentUser.tracks.savedTracks(1)).total;

    const likedTracksPromises: Promise<Page<SavedTrack>>[] = Array.from({ length: Math.ceil(total / 50) }, (_, i) => SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).currentUser.tracks.savedTracks(50, i * 50));
    const likedTracks = await Promise.all(likedTracksPromises);
    likedTracks.forEach((likedTrack) => {
      likedTrack.items.forEach((trackItem) => {
        uniqueTracks.add(trackItem.track.id);
      });
    });

    return uniqueTracks;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};
const isSetOfTrackIds = (value: any): value is Set<string> => (value.type === "error" ? false : true);

const getLikedTracks = async ({ trackIds, accessToken }: { trackIds: string[]; accessToken: AccessToken }) => {
  const tracks = await getRecentSavedTracksIdsOfCurrentUser({ accessToken });
  if (!isSetOfTrackIds(tracks)) {
    return tracks;
  }

  const likedTracks = new Set<string>();
  trackIds.forEach((trackId) => {
    if (tracks.has(trackId)) {
      likedTracks.add(trackId);
    }
  });
  return likedTracks;
};

const getRecentPlayed = async ({ accessToken, type, time_range, limit = 50, offset = 50 }: { accessToken: AccessToken; type: "tracks" | "artists"; time_range: "short_term" | "medium_term" | "long_term"; limit?: MaxInt<50>; offset?: number }) => {
  console.debug("[Called]", "getRecentPlayedTracks");
  try {
    const unique = new Set<string>();
    const tracks = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).currentUser.topItems(type, time_range, limit, offset);
    tracks.items.forEach((track) => {
      unique.add(track.id);
    });
    return unique;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

export { arePlaylists, areUsers, getLikedTracks, getPlaylist, getPlaylists, getPlaylistsWithPageAndLimit, getPossibleConnections, getRecentPlayed, getUser, isPlaylist, isSetOfTrackIds, isUser };

