"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { signOut, useSession, signIn } from "next-auth/react";

export default function SignOutButton() {
  const { data: session } = useSession();

  return session ? (
    <Button variant="outline" onClick={() => signOut()}>
      Sign Out
    </Button>
  ) : (
    <Button variant="outline" onClick={() => signIn()}>
      Sign in
    </Button>
  );
}
