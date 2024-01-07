"use server";

import { getPlaylistsWithPageAndLimit } from "@/service/server";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]/auth-options";
import Playlists from "@/app/home/Playlists";
import { arePlaylists } from "@/service/server";

const MAX_LIMIT = 8;

export async function fetchPlaylists(page: number) {
  const session = await getServerSession(authOptions);
  const accessToken = {
    access_token: session?.user.access_token!,
    expires_in: session?.user.expires_in!,
    token_type: session?.user.token_type!,
    refresh_token: session?.user.refresh_token!,
  };

  const playlists = await getPlaylistsWithPageAndLimit({
    userId: session?.user.id!,
    accessToken: accessToken,
    page: page,
    limit: MAX_LIMIT,
  });

  return playlists?.length === 0 ? null : <Playlists playlists={playlists} />;
}
