import NextAuth from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';

export default NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID,
      clientSecret: process.env.TWITCH_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid user:read:email analytics:read:extensions analytics:read:games channel:read:subscriptions bits:read',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.id = profile.sub; // Use 'sub' which contains the user's ID
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      return session;
    },
  },
});
