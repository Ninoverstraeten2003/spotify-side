"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <main className="flex min-h-screen w-full items-center justify-center ">
      <Card className="w-full max-w-[500px] space-y-4 bg-destructive/80 p-4 text-center md:p-8">
        <AtSignIcon className="mx-auto h-16 w-16 text-destructive-foreground" />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-destructive-foreground">
            500 Internal Server Error
          </h1>
          <p className="text-destructive-foreground">
            We're sorry, something went wrong on our end. Please try again or
            contact support if the problem persists.
          </p>
        </div>
        <Button variant="outline" onClick={() => router.push("/home")}>
          Return to Homepage
        </Button>
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="ml-2"
        >
          Try again
        </Button>
      </Card>
    </main>
  );
}

function AtSignIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}
