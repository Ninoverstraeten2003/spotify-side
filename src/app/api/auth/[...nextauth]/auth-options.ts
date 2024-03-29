import keys from "@/keys";
import type { NextAuthOptions } from "next-auth";
import { Account } from "next-auth";
import { JWT } from "next-auth/jwt";
import spotifyProfile, { refreshAccessToken } from "./spotify-profile";

export type AuthUser = {
  name: string;
  email: string;
  image: string;
  access_token: string;
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  scope: string;
  id: string;
};

const authOptions = {
  providers: [spotifyProfile],
  pages: {
    signIn: "/",
  },
  session: {
    maxAge: 60 * 60, // 1hr
  },
  callbacks: {
    async jwt({ token, account }: { token: JWT; account: Account | null }) {
      // Initial sign in
      if (account) {
        const updatedToken = {
          ...token,
          access_token: account?.access_token,
          token_type: account?.token_type,
          expires_at: account?.expires_at ?? Date.now() / 1000,
          expires_in: (account?.expires_at ?? 0) - Date.now() / 1000,
          refresh_token: account?.refresh_token,
          scope: account?.scope,
          id: account?.providerAccountId,
        };
        return updatedToken;
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() / 1000 < (token?.expires_at ?? 0)) {
        return token;
      }
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }: { session: any; token: any }) {
      const user: AuthUser = {
        ...session.user,
        access_token: token.access_token,
        token_type: token.token_type,
        expires_at: token.expires_at,
        expires_in: token.expires_in,
        refresh_token: token.refresh_token,
        scope: token.scope,
        id: token.id,
      };
      session.user = user;
      session.error = token.error;
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: keys.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

export default authOptions;
