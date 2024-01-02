import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = createEnv({
  server: {
    NEXTAUTH_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    SPOTIFY_CLIENT_SECRET: z.string(),
  },
  client: {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: z.string(),
    NEXT_PUBLIC_URL: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  },
});
export type Keys = typeof keys;
export default keys;
