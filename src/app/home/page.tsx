
import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]/auth-options";
import Playlists from "./Playlists";
import { getPlaylists } from "@/service";



export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const accessToken = {
    access_token: session?.user.access_token!,
    expires_in: session?.user.expires_in!,
    token_type: session?.user.token_type!,
    refresh_token: session?.user.refresh_token!,
  };
  const playlists = await getPlaylists({
    userId: session?.user.id!,
    accessToken: accessToken,
  });

  return (
    <>
      <div className="container mt-10">
        <Playlists playlists={playlists?.items} />
      </div>
    </>
  );
}
