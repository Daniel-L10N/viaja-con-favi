import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Only allow specific email
      const allowedEmail = "viajaconfavi@gmail.com";
      if (profile?.email === allowedEmail) {
        return true;
      }
      return false; // Block other emails
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});

export { handler as GET, handler as POST };