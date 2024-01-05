"use-client";
import SpotifyApi from "../lib/spotify-sdk/ClientInstance";
import { Page, SavedTrack, Playlist as SpotifyPlaylist, User } from "@spotify/web-api-ts-sdk";

const getPlaylist = async ({ playlistId }: { playlistId: string }) => {
  try {
    const playlist: SpotifyPlaylist = await SpotifyApi.playlists.getPlaylist(playlistId);

    return playlist;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isPlaylist = (value: any): value is SpotifyPlaylist => (value.type === "error" ? false : true);
const arePlaylists = (value: any): value is SpotifyPlaylist[] => (value.type === "error" ? false : true);

const getPlaylists = async ({ userId }: { userId: string }) => {
  console.debug("[Called]", "getPlaylists");
  try {
    const total = (await SpotifyApi.playlists.getUsersPlaylists(userId, 1)).total;

    const playlistsPromises = Array.from({ length: Math.ceil(total / 50) }, (_, i) => SpotifyApi.playlists.getUsersPlaylists(userId, 50, i * 50));
    const playlists = await Promise.all(playlistsPromises);
    return playlists?.map((playlist) => playlist.items).flat();
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const areUsers = (value: any): value is User[] => (value.type === "error" ? false : true);

const getPossibleConnections = async ({ userId }: { userId: string }) => {
  console.debug("[Called]", "getPossibleConnections");
  try {
    const playlists = await getPlaylists({ userId });
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
    const userPromises = Array.from(uniqueUserIds).map((ownerId) => getUser({ userId: ownerId }));
    const users = Promise.all(userPromises);
    return users;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isUser = (value: any): value is User => (value.type === "error" ? false : true);

const getUser = async ({ userId }: { userId: string }) => {
  console.debug("[Called]", "getUser");
  const user = await SpotifyApi.users.profile(userId);
  return user;
};

const getRecentSavedTracksIdsOfCurrentUser = async () => {
  console.debug("[Called]", "getSavedTracksOfUser");
  try {
    const uniqueTracks = new Set<string>();
    const total = (await SpotifyApi.currentUser.tracks.savedTracks(1)).total;

    const likedTracksPromises: Promise<Page<SavedTrack>>[] = Array.from({ length: Math.ceil(total / 50) }, (_, i) => SpotifyApi.currentUser.tracks.savedTracks(50, i * 50));
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

const getLikedTracks = async ({ trackIds }: { trackIds: string[] }) => {
  const tracks = await getRecentSavedTracksIdsOfCurrentUser();
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

export { getLikedTracks, getPlaylist, getPlaylists, getPossibleConnections, getUser, isPlaylist, arePlaylists, isSetOfTrackIds, isUser, areUsers };
