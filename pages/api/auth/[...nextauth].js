import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import clientPromise from "../../../lib/mongodb";
import User from "../../../models/userModel";
import connectDb from "../../../utils/db";
import crypto from "crypto";
import { createUsername } from "../../../utils/createUsername";


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: "database",
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
    logo: "/cover.png",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials, isNewUser }) {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // console.log("Session===>", session);
      // console.log("User===>", user);
      session.user.id = user.id;
      session.user.username = user.username
      return session;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    signIn: async ({ user, account, profile, isNewUser }) => {
      console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
      if (isNewUser) {
        try {
          await connectDb();

          let username;

          //extract email username
          const emailUsername = user.email.split("@")[0].replace(".", "-");
          console.log("username===>", emailUsername);
          //check if username exists
          const userNameExists = await createUsername(emailUsername);
          //generate username
          if (!userNameExists) {
            username = emailUsername;
          } else {
            username = emailUsername + crypto.randomBytes(2).toString("hex")
          }

          const updatedUser = await User.findByIdAndUpdate(
            user.id,
            {username: username, role: 'user'},
            { new: true, runValidators: true }
          );

          console.log(`updatedUser===>: ${JSON.stringify(updatedUser)}`);
        } catch (error) {
          console.log(error);
        }
      }
    },
    // updateUser({ user })
  },
});
