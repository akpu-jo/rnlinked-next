import Head from "next/head";
import Image from "next/image";
import Header from "../components/navs/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import MobileNav from "../components/navs/MobileNav";
import { PostCard } from "@/components/post/PostCard";
import { Timeline } from "@/components/users/Timeline";
import Welcome from "./welcome";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import socket from "@/utils/clientSocket";
import { Button, Modal, Text, useModal } from "@nextui-org/react";
import PostId from "./post/[postid]";
import PostPageTemplate from "@/components/post/PostPageTemplate";
import { Tab } from "@headlessui/react";

export default function Home({ posts }) {
  const { data: session } = useSession();

  const categories = ["Community", "Articles"];

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
          <main className=" flex-1">
            <Tab.Group>
              <Tab.List className=" sticky top-0 z-4 bg-white space-x-3 mx-3 border-b whitespace-nowrap overflow-x-scroll hide-scrollbar">
                {categories.map((category) => (
                  <Tab key={category}>
                    {({ selected }) => (
                      <h2
                        className={` p-2 ${
                          selected && " border-b-2 border-primary-confetti"
                        } `}
                      >
                        {category}
                      </h2>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Timeline posts={posts} />
                </Tab.Panel>
                <Tab.Panel>Articles stay here</Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </main>
          <MobileNav user={session.user} />
        </div>
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
  console.log(process.env.NEXT_PUBLIC_URL);
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/posts`);

  return {
    props: {
      posts: data.posts,
    },
  };
};
