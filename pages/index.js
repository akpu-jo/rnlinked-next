import Head from "next/head";
import Image from "next/image";
import Header from "../components/navs/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import MobileNav from "../components/navs/MobileNav";
import { PostCard } from "@/components/post/PostCard";
import { Timeline } from "@/components/users/Timeline";
import connectDb from "@/utils/db";
import Post from "@/models/postModel";
import Welcome from "./welcome";
import axios from "axios";
import { useEffect } from "react";
import socket from "@/utils/clientSocket";

export default function Home({ posts }) {
  const { data: session } = useSession();
  console.log(session);

  const connectSocket = (user) => {
    let connected = false;

    socket.emit("setup", user);

    socket.on("connected", () => (connected = true));
    console.log("socket===>", socket);
  };
  // const posts = JSON.parse(p);

  const head = () => {
    return (
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    );
  };

  if (session) {
    return (
      <>
        {head()}
        <div className=" flex flex-col h-screen">
          <Header />
          {/* <pre>{JSON.stringify(session, null, 4)}</pre> */}
          <main className=" flex-1">
            <Timeline posts={posts} />
          </main>
          <MobileNav user={session.user} />
        </div>
        {/* <pre className="text-7xl">{JSON.stringify(session, null, 2)}</pre> */}
      </>
    );
  }
  return (
    <>
      {head()}
      <Welcome />
    </>
  );
}

export const getServerSideProps = async (context) => {


  const { data } = await axios.get(`https://rnlinked.vercel.app/api/posts`);

  return {
    props: {
      posts: data.posts,
    },
  };
};
