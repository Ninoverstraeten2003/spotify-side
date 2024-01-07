"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { areUsers, getPossibleConnections } from "@/service/client";
import { User } from "@spotify/web-api-ts-sdk";
import { ChevronsUpDown, MoveRight } from "lucide-react";
import { getSession } from "next-auth/react";

export default function PlaylistDropdown() {
  const [open, setOpen] = React.useState(false);
  const [playlists, setPlaylists] = React.useState(null);
  return (
    <Popover
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="mt-0 w-[200px] justify-between">
          {"Select Playlist"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Playlist" disabled={playlists === null} />
          <CommandEmpty className={cn({ hidden: !playlists, "py-6 text-center text-sm": playlists })}>No playlist found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="">
              {playlists === null ? (
                <div className="py-6 text-center text-sm">No playlist.</div>
              ) : (
                Object.entries(playlists)
                  .sort(([name1, _], [name2, __]) => (name1 < name2 ? -1 : name1 > name2 ? 1 : 0))
                  .map(([name, id]) => (
                    <CommandItem
                      key={id as string}
                      value={name}
                      onSelect={() => {
                        if (Object.keys(playlists).length === 0) setPlaylists(null);

                        setOpen(false);
                      }}
                    >
                      {name}
                    </CommandItem>
                  ))
              )}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
