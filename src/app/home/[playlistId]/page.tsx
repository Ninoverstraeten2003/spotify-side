import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import authOptions from "../../api/auth/[...nextauth]/auth-options";
import { getPlaylist, getPossibleConnections, getLikedTracks, isPlaylist, areUsers, isSetOfTrackIds } from "@/service/server";
import Connections from "../Connections";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const likedTrackIds = await getLikedTracks({ trackIds: playlist.tracks.items.map((track) => track.track?.id), accessToken: accessToken });
  if (!isSetOfTrackIds(likedTrackIds)) return <p>{likedTrackIds.message}</p>;

  // const likedTrackIds = new Set<string>();

  return (
    <>
      <div className="container mx-auto mt-10 px-10">
        <Card>
          <CardHeader className="mx-4 flex flex-col gap-2">
            <CardTitle className="flex items-center gap-4">
              <Image className="h-10 w-10 rounded-md object-cover" src={playlist?.images?.at(0)?.url || ""} alt={playlist.name} width={40} height={40} />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{playlist.name}</h2>
                <p className="text-sm text-gray-500">{playlist.description}</p>
              </div>
            </CardTitle>
            <CardDescription className="flex flex-wrap items-center gap-2">
              <span className="mr-2 text-sm text-gray-500">Owner:</span>
              <span className="text-sm text-gray-800">{playlist.owner.display_name}</span>
            </CardDescription>
            <Connections />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-sm font-medium text-gray-500">
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
                    <TableRow key={track.track.id} className="text-sm text-gray-800">
                      <TableCell>{track.track.name}</TableCell>
                      <TableCell className="text-nowrap">{Number(track.track.duration_ms / 1000 / 60).toFixed(2)} min</TableCell>
                      <TableCell>
                        <Heart className={cn(likedTrackIds.has(track.track.id) && "fill-red-500", "text-red-500")} />
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
