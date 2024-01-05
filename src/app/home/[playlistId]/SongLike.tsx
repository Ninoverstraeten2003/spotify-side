// "use client";
// import { cn } from "@/lib/utils";
// import { getLikedTracks, isSetOfTrackIds } from "@/service/client";
// import { Playlist } from "@spotify/web-api-ts-sdk";
// import { Heart } from "lucide-react";
// import { getSession } from "next-auth/react";
// import React from "react";

// export default function SongLike({ playlist }: { playlist: Playlist }) {
//   const [likedTrackIds, setLikedTrackIds] = React.useState<Set<string>>(new Set<string>());

//   React.useEffect(() => {
//     async function getLike() {
//       const session = await getSession();
//       if (!session?.user) return null;
//       const likedTrackIds = await getLikedTracks({ trackIds: playlist.tracks.items.map((track) => track.track?.id) });
//       if (!isSetOfTrackIds(likedTrackIds)) return null;
//       setLikedTrackIds(likedTrackIds);
//     }
//     getLike();
//   }, []);

//   return <Heart className={cn(likedTrackIds.has(track.track.id) && "fill-red-500", "text-red-500")} />;
// }
