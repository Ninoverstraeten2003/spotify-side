import React from "react";

import PlayList from "./Playlist";
import { Playlist } from "@spotify/web-api-ts-sdk";

const Playlists = ({ playlists }: { playlists?: Playlist[] }) => {
  return playlists?.map((playlist, index) => <PlayList key={playlist.id} index={index} spotifyPlaylist={playlist} />);
};

export default Playlists;
