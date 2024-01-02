import keys from "@/keys";
import {
  AccessToken,
  Page,
  Playlist,
  SpotifyApi,
} from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]/auth-options";
import Playlists from "./Playlists";

const getPlaylists = async ({
  accessToken,
  userId,
}: {
  accessToken: AccessToken;
  userId: string;
}) => {
  const playlists: Page<Playlist> = await SpotifyApi.withAccessToken(
    keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
    accessToken
  ).playlists.getUsersPlaylists(userId, 50);

  return playlists;
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const playlists = await getPlaylists({
    userId: session?.user.id!,
    accessToken: {
      access_token: session?.user.access_token!,
      expires_in: session?.user.expires_in!,
      token_type: session?.user.token_type!,
      refresh_token: session?.user.refresh_token!,
    },
  });

  return (
    <>
      <Playlists playlists={playlists?.items} />
    </>
  );
}
