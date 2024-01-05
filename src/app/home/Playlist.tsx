import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Playlist as SpotifyPlaylist } from "@spotify/web-api-ts-sdk";
import Link from "next/link";
import Image from "next/image";

function Playlist({ spotifyPlaylist }: { spotifyPlaylist: SpotifyPlaylist }) {
  return (
    <>
      <Link href={`/home/${spotifyPlaylist.id}`}>
        <Card className="m-2 hover:bg-muted">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image
                className="h-10 w-10 rounded-md object-cover"
                src={spotifyPlaylist.images[0]?.url}
                alt={spotifyPlaylist.name}
                width={40}
                height={40}
              />
              <div>
                <p className="text-base">{spotifyPlaylist.name}</p>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {spotifyPlaylist.description}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    </>
  );
}

export default Playlist;
