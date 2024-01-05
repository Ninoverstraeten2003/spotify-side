import React from "react";

import PlayList from "./Playlist";
import { Playlist } from "@spotify/web-api-ts-sdk";

const Playlists = ({ playlists }: { playlists?: Playlist[] }) => {
  return <div className="mt-10">{playlists?.map((playlist) => <PlayList key={playlist.id} spotifyPlaylist={playlist} />)}</div>;
};

export default Playlists;
