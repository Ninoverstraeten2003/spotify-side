"use client";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("spotify", {
      callbackUrl: "/home",
    });
    setIsLoading(false);
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Button variant="outline" type="button" disabled={isLoading} onClick={handleSubmit}>
        {isLoading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : <Icons.spotify className="mr-2 h-6 w-6 fill-foreground" />}
        Spotify
      </Button>
    </div>
  );
}
