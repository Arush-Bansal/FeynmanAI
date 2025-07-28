import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { User } from "@/features/db/models";
import dbConnect from "@/features/db/dbConnect";

const authOptions : AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        await dbConnect();
        try {
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) {
            return true;
          } else {
            const newUser = new User({
              name: user.name,
              email: user.email,
              image: user.image,
            });
            await newUser.save();
            return true;
          }
        } catch (error) {
          console.error("Error in signIn callback", error);
          return false;
        }
      },
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };