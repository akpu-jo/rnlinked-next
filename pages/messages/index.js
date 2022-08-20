import Recommendations from "@/components/explore/Recommendations";
import SearchChat from "@/components/messages/SearchChat";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import { ChevronLeftIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Inbox = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [chatList, setChatList] = useState([]);

  // const isGroup =
  const listChat = async () => {
    const { data } = await axios.get(`/api/messages/get-chats`);
    console.log(data.chats);
    setChatList(data.chats);
  };

  const getMessageLatestSender = (chat) => {
    const { latestMessage, isGroupChat } = chat;

    const isMine = latestMessage.sender._id === session.user.id;

    if (isMine) {
      return "You: ";
    } else if (!isMine && !isGroupChat) {
      return "";
    } else {
      return `${latestMessage.sender.name.split(" ")[0]}: `;
    }
  };

  useEffect(() => {
    listChat();
  }, []);

  const chatlistjsx = () => {
    return (
      <div className=" grow mb-8 ">
        {chatList.length > 0 ? (
          chatList.map((c) => (
            <div key={c._id} className=" flex items-center my-1 py-1 ml-3  ">
              <div
                onClick={() => {
                  console.log(c.isGroupChat);
                  !c.isGroupChat && router.push(`/${c.users[1].username}`);
                }}
                className=" pr-3"
              >
                <Avatar.Group>
                  {c.chatImages.map((image, i) => (
                    <Avatar
                      key={i}
                      size={`${c.chatImages.length > 1 ? 'sm' : 'lg'}`}
                      squared
                      src={image}
                    />
                  ))}
                </Avatar.Group>
              </div>
              <Link key={c._id} href={`/messages/${c._id}`}>
                <a className=" py-2 text-clip w-3/4">
                  <p className=" clip-txt-1 text-slate-800 ">{c.chatName}</p>
                  {/* {getChatName(c.chatName)} */}
                  {c.latestMessage && (
                    <p className=" text-slate-500 text-sm clip-txt-1">
                      <span className=" font-semibold">
                        {getMessageLatestSender(c)}
                      </span>
                      {c.latestMessage.content}
                    </p>
                  )}
                </a>
              </Link>
            </div>
          ))
        ) : (
          <p>Nothing to show</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col ">
      <header className=" px-3 pt-3 text-xl font-semibold tracking-wide  mb-4 bg-white z-5 border-b border-slate-100 shadow-sm">
        <div className=" flex justify-between items-center">
          <button
            className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <ChevronLeftIcon className=" w-5 h-5" />
          </button>
          <p className=" text-2xl tracking-wide">Inbox</p>
          <div className="w-1/3"></div>
          <Link href={"/messages/new"}>
            <a>
              <PencilAltIcon className=" w-7 h-7" />
            </a>
          </Link>
        </div>
        <SearchChat
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setRecommendedUsers={setRecommendedUsers}
        />
      </header>
      <main className=" mx-4 ">
        <Recommendations recommendedUsers={recommendedUsers} />

        {chatlistjsx()}
        <MobileNav />
      </main>
    </div>
  );
};

export default Inbox;
