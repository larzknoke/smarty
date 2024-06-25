import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // return profile.email_verified && profile.email.endsWith("@company.com");
        return profile.email_verified;
      }
      return false;
    },
    async jwt({ token, account }) {
      console.log("token jwt", token);
      console.log("account jwt", account);
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at;
        return token;
      } else if (Date.now() < token.expiresAt * 1000) {
        // Subsequent logins, if the `access_token` is still valid, return the JWT
        return token;
      } else {
        console.log(" refresh it!");
        console.log(" refresh it!");
        console.log(" refresh it!");
        console.log(" refresh it!");
        console.log(" refresh it!");

        // Subsequent logins, if the `access_token` has expired, try to refresh it
        if (!token.refreshToken) throw new Error("Missing refresh token");

        try {
          // The `token_endpoint` can be found in the provider's documentation. Or if they support OIDC,
          // at their `/.well-known/openid-configuration` endpoint.
          // i.e. https://accounts.google.com/.well-known/openid-configuration
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_ID,
              client_secret: process.env.GOOGLE_SECRET,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken,
            }),
            method: "POST",
          });

          const responseTokens = await response.json();

          if (!response.ok) throw responseTokens;

          return {
            // Keep the previous token properties
            ...token,
            accessToken: responseTokens.access_token,
            expiresAt: Math.floor(
              Date.now() / 1000 + responseTokens.expires_in
            ),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refreshToken: responseTokens.refresh_token ?? token.refreshToken,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property can be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      console.log("token session", token);
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      // checks: "none",
      // authorizationUrl: process.env.GOOGLE_AUTH_URI,
      authorization: {
        params: {
          // scope: "openid email profile https://www.googleapis.com/auth/tasks",
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
};

export default NextAuth(authOptions);
