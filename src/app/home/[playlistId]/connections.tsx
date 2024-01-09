"use client";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { areUsers, getPossibleConnections } from "@/service/client";
import { User } from "@spotify/web-api-ts-sdk";
import { ChevronsUpDown, MoveRight } from "lucide-react";
import { getSession } from "next-auth/react";
import React from "react";

type ConvertMapArrayToMap<ArrayType extends Array<{ [Key: string | number | symbol]: any }>, KeyType extends keyof ArrayType[number], ValueType extends keyof ArrayType[number]> = {
  [K in ArrayType[number][KeyType]]: ArrayType[number][ValueType];
};

const convertMapArrayToMap = <ItemType extends Record<KeyType | ValueType, any>, KeyType extends keyof ItemType, ValueType extends keyof ItemType>(mapArray: ItemType[], key: KeyType, valueKey: ValueType): ConvertMapArrayToMap<ItemType[], KeyType, ValueType> => {
  return mapArray.reduce(
    (accumulator, currentItem) => {
      accumulator[currentItem[key]] = currentItem[valueKey];
      return accumulator;
    },
    {} as ConvertMapArrayToMap<ItemType[], KeyType, ValueType>
  );
};

export default function Connections() {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const [leftValues, setLeftValues] = React.useState<ConvertMapArrayToMap<User[], "display_name", "id"> | null>(null);
  const [rightValues, setRightValues] = React.useState<ConvertMapArrayToMap<User[], "display_name", "id"> | null>(null);

  React.useEffect(() => {
    async function getConnections() {
      const session = await getSession();
      if (!session?.user) return null;

      const connections = await getPossibleConnections({
        userId: session?.user.id,
      });
      if (!areUsers(connections)) return null;

      const userArrayToMap = convertMapArrayToMap(connections, "display_name", "id");
      if (Object.keys(userArrayToMap).length !== 0) setLeftValues(userArrayToMap);
    }
    getConnections();
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="mt-0 w-[200px] justify-between">
            {"Add Connection"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Connections" disabled={leftValues === null} />
            <CommandEmpty className={cn({ hidden: !leftValues, "py-6 text-center text-sm": leftValues })}>No connection found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="">
                {leftValues === null ? (
                  <div className="py-6 text-center text-sm">No connections.</div>
                ) : (
                  Object.entries(leftValues)
                    .sort(([name1, _], [name2, __]) => (name1 < name2 ? -1 : name1 > name2 ? 1 : 0))
                    .map(([name, id]) => (
                      <CommandItem
                        key={id}
                        value={name}
                        onSelect={(): void => {
                          delete leftValues[name];
                          if (Object.keys(leftValues).length === 0) setLeftValues(null);
                          setRightValues({ ...rightValues, [name]: id });
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
      <MoveRight className="hidden sm:inline-block" />
      <Popover
        open={open2}
        onOpenChange={(open2) => {
          setOpen2(open2);
        }}
      >
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open2} className="mt-0 w-[200px] justify-between">
            {"Added Connections"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Connections" disabled={rightValues === null} />
            <CommandEmpty className={cn({ hidden: !rightValues, "py-6 text-center text-sm": rightValues })}>No connection found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                {rightValues === null ? (
                  <div className="py-6 text-center text-sm">No connections added.</div>
                ) : (
                  Object.entries(rightValues)
                    .sort(([name1, _], [name2, __]) => (name1 < name2 ? -1 : name1 > name2 ? 1 : 0))
                    .map(([name, id]) => (
                      <CommandItem
                        key={id}
                        value={name}
                        onSelect={(): void => {
                          delete rightValues[name];
                          if (Object.keys(rightValues).length === 0) setRightValues(null);
                          setLeftValues({ ...leftValues, [name]: id });
                          setOpen2(false);
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
    </div>
  );
}
