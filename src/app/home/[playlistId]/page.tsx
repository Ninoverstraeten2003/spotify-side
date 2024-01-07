import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import authOptions from "../../api/auth/[...nextauth]/auth-options";
import Connections from "./connections";
import { getPlaylist, isPlaylist, getLikedTracks, isSetOfTrackIds } from "@/service/server";
import PlaylistDropdown from "./playlist-drop-down";

const PlaylistPage = async ({ params }: { params: { playlistId: string } }) => {
  const session = await getServerSession(authOptions);
  const accessToken = {
    access_token: session?.user.access_token!,
    expires_in: session?.user.expires_in!,
    token_type: session?.user.token_type!,
    refresh_token: session?.user.refresh_token!,
  };

  const playlist = await getPlaylist({
    playlistId: params.playlistId!,
    accessToken: {
      access_token: session?.user.access_token!,
      expires_in: session?.user.expires_in!,
      token_type: session?.user.token_type!,
      refresh_token: session?.user.refresh_token!,
    },
  });
  if (!isPlaylist(playlist)) return <p>{playlist.message}</p>;
  // const playlist: any = {
  //   name: "Awesome Playlist",
  //   description: "A collection of great tracks",
  //   owner: {
  //     display_name: "John Doe",
  //   },
  //   images: [
  //     {
  //       url: "https://example.com/playlist-cover.jpg",
  //     },
  //   ],
  //   tracks: {
  //     items: [
  //       {
  //         track: {
  //           id: "1",
  //           name: "Track 1",
  //           duration_ms: 240000, // 4 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "2",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "3",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "4",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "5",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "6",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "7",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "8",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //       {
  //         track: {
  //           id: "9",
  //           name: "Track 2",
  //           duration_ms: 180000, // 3 minutes
  //         },
  //       },
  //     ],
  //   },
  // };

  const likedTrackIds = await getLikedTracks({ trackIds: playlist.tracks.items.map((track) => track.track?.id), accessToken: accessToken });
  if (!isSetOfTrackIds(likedTrackIds)) return <p>{likedTrackIds.message}</p>;

  // const likedTrackIds = new Set(["1", "3"]);

  return (
    <>
      <div className="container mx-auto mt-20 px-10">
        <Card>
          <CardHeader className="mx-4 flex flex-col gap-2">
            <CardTitle className="flex items-center gap-4">
              <Image className="h-10 w-10 rounded-md object-cover" src={playlist?.images?.at(0)?.url || ""} alt={playlist.name} width={40} height={40} />
              <div>
                <h2 className="text-2xl font-bold text-foreground">{playlist.name}</h2>
                <p className="text-sm text-foreground">{playlist.description}</p>
              </div>
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm text-foreground">Owner:</span>
              <span className="text-sm text-foreground">{playlist.owner.display_name}</span>
            </CardDescription>
            <Connections />
            <PlaylistDropdown/>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-sm font-medium text-foreground">
                  <TableHead>Track Name</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Liked</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlist.tracks.items.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-start">
                      No Tracks
                    </TableCell>
                  </TableRow>
                )}
                {playlist.tracks.items.map((track) =>
                  track.track !== null ? (
                    <TableRow key={track.track.id} className="text-sm text-foreground">
                      <TableCell className="w-full">{track.track.name}</TableCell>
                      <TableCell className="text-nowrap">{Number(track.track.duration_ms / 1000 / 60).toFixed(2)} min</TableCell>
                      <TableCell>
                        <Heart className={cn(likedTrackIds.has(track.track.id) && "fill-primary", "text-primary")} />
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PlaylistPage;
