import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/auth-options";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DoorOpen, StickyNote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto flex justify-between gap-6 px-10 pt-20">
      <div className="flex max-w-md flex-col gap-6">
        <Image src={"https://avatars.githubusercontent.com/u/91029947?v=4"} alt={session.user.name} width={300} height={300} className="rounded-lg" />
        <p className="text-nowrap text-3xl font-bold">{session.user.name}</p>
        <div className="flex gap-2 text-sm">
          <StickyNote className="h-10 w-10" /> Synced items will be saved in our database. This feature is not available yet and only dummy data is present.
        </div>
        <Button variant="outline" asChild>
          <Link href="/home" className="flex gap-2 rounded-md">
            <DoorOpen />
            Go back to Home
          </Link>
        </Button>
      </div>
      <div className="grid w-full grid-cols-2 gap-2">
        <Card className="flex flex-col gap-2 p-6">
          <Button variant="outline">Sync Playlists</Button>
          <Progress value={20} className="" />
          <p>10/50</p>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <Button variant="outline">Sync Likes</Button>
          <Progress value={40} className="" />
          <p>400/1000</p>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <Button variant="outline">Sync Recent Played Tracks</Button>
          <Progress value={70} className="" />
          <p>710/1020</p>
        </Card>
        <Card className="flex flex-col gap-2 p-6">
          <Button variant="outline">Sync Top Items</Button>
          <Progress value={10} className="" />
          <p>10/100</p>
        </Card>
      </div>
    </div>
  );
}
