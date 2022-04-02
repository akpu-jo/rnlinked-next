import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import clientPromise from "../../../lib/mongodb";
import connectDb from "../../../utils/db";
import handleHello from "../hello";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "database"
  },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
          }),
          TwitterProvider({
            clientId: process.env.TWITTER_ID,
            clientSecret: process.env.TWITTER_SECRET,
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    theme: {
      colorScheme: "auto",
      logo: '/cover.png'
    },
    callbacks: {
      async signIn({ user, account, profile, email, credentials, isNewUser }) {
        const isAllowedToSignIn = true
        if (isAllowedToSignIn) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        console.log("Session===>", session)
        console.log("User===>", user)
        session.id = user.id
        return session
      }
    }
  })