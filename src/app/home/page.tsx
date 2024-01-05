import { getServerSession } from "next-auth/next";
import authOptions from "../api/auth/[...nextauth]/auth-options";
import Playlists from "./Playlists";
import { getPlaylists, arePlaylists } from "@/service/server";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const accessToken = {
    access_token: session?.user.access_token!,
    expires_in: session?.user.expires_in!,
    token_type: session?.user.token_type!,
    refresh_token: session?.user.refresh_token!,
  };
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const playlists = await getPlaylists({
    userId: session?.user.id!,
    accessToken: accessToken,
  });
  if (!arePlaylists(playlists)) return <p>{playlists.message}</p>;
  // const playlists: any = [
  //   {
  //     id: "mockId123",
  //     name: "Super Awesome Playlist",
  //     images: [{ url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.arimetrics.com%2Fwp-content%2Fuploads%2F2020%2F01%2Fmockup-1.png&tbnid=ru0ZyBugN6eaIM&vet=12ahUKEwjBxZKm-MaDAxWgpicCHa-SC50QMygAegQIARB2..i&imgrefurl=https%3A%2F%2Fwww.arimetrics.com%2Fen%2Fdigital-glossary%2Fmockup&docid=vpw6h5kJX8VD1M&w=300&h=300&q=mockimage&ved=2ahUKEwjBxZKm-MaDAxWgpicCHa-SC50QMygAegQIARB2" }],
  //     description: "The playlist that thinks it knows all the cool tunes. Spoiler: It does!",
  //   },
  //   {
  //     id: "mockId456",
  //     name: "Chill Vibes Only",
  //     images: [{ url: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.arimetrics.com%2Fwp-content%2Fuploads%2F2020%2F01%2Fmockup-1.png&tbnid=ru0ZyBugN6eaIM&vet=12ahUKEwjBxZKm-MaDAxWgpicCHa-SC50QMygAegQIARB2..i&imgrefurl=https%3A%2F%2Fwww.arimetrics.com%2Fen%2Fdigital-glossary%2Fmockup&docid=vpw6h5kJX8VD1M&w=300&h=300&q=mockimage&ved=2ahUKEwjBxZKm-MaDAxWgpicCHa-SC50QMygAegQIARB2" }],
  //     description: "For when you want to unwind and pretend you have your life together.",
  //   },
  //   // Add more mock playlists as needed
  // ];

  return (
    <>
      <div className="container h-full">{playlists?.length === 0 ? <div className="flex h-full w-full items-center justify-center">No Playlists</div> : <Playlists playlists={playlists} />}</div>
    </>
  );
}
