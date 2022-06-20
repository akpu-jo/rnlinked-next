import Recommendations from "@/components/explore/Recommendations";
import SearchChat from "@/components/messages/SearchChat";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import { PencilAltIcon } from "@heroicons/react/outline";
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
    console.log(data);
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
      <div className=" flex-1">
        {chatList.length > 0 ? (
          chatList.map((c) => (
            <div key={c._id} className=" flex  ">
              <ul
                onClick={() => {
                  console.log(c.isGroupChat);
                  !c.isGroupChat && router.push(`/${c.users[1].username}`);
                }}
                className=" relative w-10 p-1 m-1 "
              >
                {c.chatImages.map((image, i) => (
                  <li
                    key={i}
                    className={` ${
                      c.chatImages.length > 1
                        ? "last:top-5 last:bottom-2 last:right-2 first:left-2 first:top-0 first:bottom-7 border-2 rounded-xl  "
                        : " w-8 h-8 top-3 left-1 right-1"
                    } absolute `}
                  >
                    <Image
                      className=" rounded-xl"
                      src={image}
                      alt="Picture of the logo"
                      width={50}
                      height={50}
                    />
                  </li>
                ))}
              </ul>
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
    <div className=" flex flex-col h-screen ">
      <AltHeader>
        <p className=" text-2xl tracking-wide">Inbox</p>
        <div className="w-1/3"></div>
        <Link href={"/messages/new"}>
          <a>
            <PencilAltIcon className=" w-7 h-7" />
          </a>
        </Link>
      </AltHeader>
      <SearchChat
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setRecommendedUsers={setRecommendedUsers}
      />
      <Recommendations recommendedUsers={recommendedUsers} />

      {chatlistjsx()}
      <MobileNav />
    </div>
  );
};

export default Inbox;
