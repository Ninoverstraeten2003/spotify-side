import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voting Playlist",
  description: "Vote for your favorite songs on Spotify",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className={cn(inter.className, "h-full")}>
        <main className="h-full">
          <Providers>
            {children}
            <Analytics />
            <SpeedInsights />
          </Providers>
        </main>
      </body>
    </html>
  );
}
