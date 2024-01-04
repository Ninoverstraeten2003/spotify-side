import keys from "@/keys";
import { AccessToken, Page, SpotifyApi, Playlist as SpotifyPlaylist } from "@spotify/web-api-ts-sdk";

const getPlaylist = async ({ accessToken, playlistId }: { accessToken: AccessToken; playlistId: string }) => {
  try {
    const playlist: SpotifyPlaylist = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getPlaylist(playlistId);

    return playlist;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isPlaylist = (value: any): value is SpotifyPlaylist => (value.type === "error" ? false : true);

const getPlaylists = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getPlaylists");
  const playlists: Page<SpotifyPlaylist> = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).playlists.getUsersPlaylists(userId, 50);

  return playlists;
};

const getPossibleConnections = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getPossibleConnections");
  const playlists = await getPlaylists({ accessToken, userId });
  const uniqueUserIds = new Set<string>();

  // Iterate over each playlist and add user IDs to the set
  playlists.items.forEach((playlist) => {
    uniqueUserIds.add(playlist.owner.id);
    playlist?.tracks?.items?.forEach((item) => {
      uniqueUserIds.add(item.added_by.id);
    });
  });
  // Remove the current user from the set
  uniqueUserIds.delete(userId);
  // Map over the unique user IDs and fetch user details
  const userPromises = Array.from(uniqueUserIds).map((ownerId) => getUser({ accessToken, userId: ownerId }));

  return Promise.all(userPromises);
};

const getUser = async ({ accessToken, userId }: { accessToken: AccessToken; userId: string }) => {
  console.debug("[Called]", "getUser");
  const user = await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).users.profile(userId);

  return user;
};

const getRecentSavedTracksIdsOfCurrentUser = async ({ accessToken }: { accessToken: AccessToken }) => {
  console.debug("[Called]", "getSavedTracksOfUser");

  const uniqueTracks = new Set<string>();
  const total = (await SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).currentUser.tracks.savedTracks(1)).total;

  const likedTracksPromises = Array.from({ length: Math.ceil(total / 50) }, (_, i) => SpotifyApi.withAccessToken(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, accessToken).currentUser.tracks.savedTracks(50, i * 50));
  const likedTracks = await Promise.all(likedTracksPromises);
  likedTracks.forEach((likedTrack) => {
    likedTrack.items.forEach((trackItem) => {
      uniqueTracks.add(trackItem.track.id);
    });
  });

  return uniqueTracks;
};

const getLikedTracks = async ({ trackIds, accessToken }: { trackIds: string[]; accessToken: AccessToken }) => {
  const tracks = await getRecentSavedTracksIdsOfCurrentUser({ accessToken });
  const likedTracks = new Set<string>();
  trackIds.forEach((trackId) => {
    if (tracks.has(trackId)) {
      likedTracks.add(trackId);
    }
  });
  return likedTracks;
};

export { getPlaylist, getPlaylists, getPossibleConnections, getUser, isPlaylist, getLikedTracks };
