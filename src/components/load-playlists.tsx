"use client";

import Playlists from "@/app/home/Playlists";
import { fetchPlaylists } from "@/app/home/action";
import { arePlaylists } from "@/service/client";
import { Playlist } from "@spotify/web-api-ts-sdk";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function LoadPlaylists() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<JSX.Element[]>([]);
  const [page, setPage] = useState(1);
  const [hasMorePlaylists, setHasMorePlaylists] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView && hasMorePlaylists) {
      setIsLoading(true);
      // Add a delay of 500 milliseconds
      const delay = 500;
      const timeoutId = setTimeout(() => {
        fetchPlaylists(page).then((res) => {
          if (res === null) {
            setHasMorePlaylists(false);
            return;
          }
          setData([...data, res]);
          setPage((prevPage) => prevPage + 1);
        });

        setIsLoading(false);
      }, delay);

      // Clear the timeout if the component is unmounted or inView becomes false
      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);

  return (
    <>
      <section>{data}</section>
      <section className="flex h-20 w-full items-center justify-center">
        <div ref={ref}>{inView && isLoading && <RefreshCcw className="h-5 w-5" />}</div>
        {!hasMorePlaylists && <p className="text-muted-foreground">No more playlists</p>}
      </section>
    </>
  );
}

export default LoadPlaylists;
