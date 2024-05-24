import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  jwt: {
    maxAge: 60 * 60 * 24,
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
      console.log("token account", account);
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
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
