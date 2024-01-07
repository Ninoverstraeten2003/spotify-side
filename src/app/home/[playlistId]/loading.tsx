import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronsUpDown, MoveRight } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto mt-20 px-10">
      <Card>
        <CardHeader className="mx-4 flex flex-col gap-2">
          <CardTitle className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-md object-cover" />
            <div>
              <Skeleton className="mb-2 h-6 w-60" />
              <Skeleton className="h-5 w-52" />
            </div>
          </CardTitle>
          <CardDescription className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-sm text-foreground">Owner:</span>
            <Skeleton className="h-5 w-20" />
          </CardDescription>
          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="mt-0 w-[200px] justify-between">
                  {"Add Connection"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Connections" />
                  <CommandEmpty>No connection found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <CommandItem key={i} className="mb-2 p-0">
                          <Skeleton className="h-8 w-full p-0" />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <MoveRight className="hidden sm:inline-block" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="mt-0 w-[200px] justify-between">
                  {"Added Connections"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search Connections" />
                  <CommandEmpty>No connection found.</CommandEmpty>
                  <CommandGroup>
                    <ScrollArea>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <CommandItem key={i} className="mb-2 p-0">
                          <Skeleton className="h-8 w-full p-0" />
                        </CommandItem>
                      ))}
                    </ScrollArea>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="mt-0 w-[200px] justify-between">
                {"Select Playlist"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search Playlist" />
                <CommandEmpty>No playlist found.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <CommandItem key={i} className="mb-2 p-0">
                        <Skeleton className="h-8 w-full p-0" />
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i} className="text-sm text-foreground">
                  <TableCell className="w-full">
                    <Skeleton className="h-5 w-80" />
                  </TableCell>
                  <TableCell className="text-nowrap">
                    <Skeleton className="h-5 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-10" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
