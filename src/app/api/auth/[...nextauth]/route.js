import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/prisma"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("no username or password");
          return null;
        }

        const user = await db.users.findUnique({
          where: { Username: credentials.username },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (credentials.password !== user.Password) {
          console.log("Invalid Password");
          return null;
        }
        console.log("User authenticated");

        return {
          id: user.UserID,
          name: user.Username,
          locationId: user.LocationID,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.username = user.username;
        token.locationId = user.locationId;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.userId = token.userId;
      session.user.username = token.username;
      session.user.locationId = token.locationId;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
