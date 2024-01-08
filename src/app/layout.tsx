import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { UserNav } from "./user-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voting Playlist",
  description: "Vote for your favorite songs on Spotify",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className={cn(inter.className, "min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Providers>
            <header className="fixed top-0 z-40 w-screen border-b border-black/20 backdrop-blur-sm">
              <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex flex-1 items-center justify-end space-x-4">
                  <nav className="flex items-center space-x-2">
                    <ModeToggle />
                    <UserNav />
                  </nav>
                </div>
              </div>
            </header>
            <main className="min-h-screen w-full">
              {children}
              <Analytics />
              <SpeedInsights />
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
