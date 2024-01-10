import keys from "@/keys";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

const spotifyProfile = SpotifyProvider({
  clientId: keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: keys.SPOTIFY_CLIENT_SECRET,
});

const authURL = new URL("https://accounts.spotify.com/authorize");

const scopes = ["user-read-email", "playlist-read-private", "playlist-read-collaborative", "user-library-read", "user-read-recently-played", "user-top-read"];

authURL.searchParams.append("scope", scopes.join(" "));

spotifyProfile.authorization = authURL.toString();

export default spotifyProfile;

const refreshURL = new URL("https://accounts.spotify.com/api/token");
const authorization = Buffer.from(keys.NEXT_PUBLIC_SPOTIFY_CLIENT_ID + ":" + keys.SPOTIFY_CLIENT_SECRET);

export async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(refreshURL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + authorization.toString("base64"),
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refresh_token as string,
      }),
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      token_type: refreshedTokens.token_type,
      expires_at: refreshedTokens.expires_in + Date.now() / 1000,
      expires_in: refreshedTokens.expires_in,
      refresh_token: refreshedTokens.refresh_token ?? token.refresh_token,
      scope: refreshedTokens.scope,
    };
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
