import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import keys from "@/keys";
import {
  AccessToken,
  SpotifyApi,
  Playlist as SpotifyPlaylist,
} from "@spotify/web-api-ts-sdk";
import { getServerSession } from "next-auth/next";
import authOptions from "../../api/auth/[...nextauth]/auth-options";

const getPlaylist = async ({
  accessToken,
  playlistId,
}: {
  accessToken: AccessToken;
  playlistId: string;
}) => {
  try {
    const playlist: SpotifyPlaylist = await SpotifyApi.withAccessToken(
      keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      accessToken
    ).playlists.getPlaylist(playlistId);

    return playlist;
  } catch (e) {
    return { type: "error", message: (e as Error).message };
  }
};

const isPlaylist = (value: any): value is SpotifyPlaylist =>
  value.type === "error" ? false : true;

const PlaylistPage = async ({ params }: { params: { playlistId: string } }) => {
  const session = await getServerSession(authOptions);
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

  return (
    <>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader className="mx-4 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {playlist.name}
            </h2>
            <p className="text-sm text-gray-500">{playlist.description}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Collaborative:</span>
              <span className="text-sm text-gray-800">
                {playlist.collaborative ? "Yes" : "No"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Owner:</span>
              <span className="text-sm text-gray-800">
                {playlist.owner.display_name}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="text-sm font-medium text-gray-500">
                  <TableHead>Track Name</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {playlist.tracks.items.map((track) =>
                  track.track !== null ? (
                    <TableRow
                      key={track.track.id}
                      className="text-sm text-gray-800"
                    >
                      <TableCell>{track.track.name}</TableCell>
                      <TableCell>
                        {Number(track.track.duration_ms / 1000 / 60).toFixed(2)}{" "}
                        min
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
