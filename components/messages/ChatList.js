import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { auth } from "firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ChatList = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [chatList, setChatList] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const active = (href, otherUserId, group) => router.asPath === href || (router.query.msgId === otherUserId && !group );

  const listChat = async () => {
    const token = await auth.currentUser.getIdToken(true);
    const { data } = await axios.get(`/api/messages/get-chats`, {
      headers: {
        token,
      },
    });
    console.log(data.chats);
    setChatList(data.chats);
  };

  const getMessageLatestSender = (chat) => {
    const { latestMessage, isGroupChat } = chat;

    const isMine = latestMessage.sender._id === user._id;

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

  return (
    <div className="pb-24 ">
      {chatList.length > 0 ? (
        chatList.map((c) => (
          <div
            key={c._id}
            className={`${
              active(`/messages/${c._id}`, c.users[0]._id, c.isGroupChat) &&
              "bg-elm-50 -mr-3 border-r-2 border-primary-confetti text-"
            } flex items-center my-1 py-1 ml-3`}
          >
            <div
              onClick={() => {
                console.log(c.isGroupChat);
                !c.isGroupChat && router.push(`/${c.users[0].username}`);
              }}
              className=" pr-3"
            >
              <Avatar.Group>
                {c.chatImages.map((image, i) => (
                  <Avatar
                    key={i}
                    size={`${c.chatImages.length > 1 ? "sm" : "lg"}`}
                    squared
                    src={image}
                  />
                ))}
              </Avatar.Group>
            </div>
            <Link
              key={c._id}
              href={`/messages/${c._id}`}
              className={` py-2 text-clip w-3/4 `}
            >
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
            </Link>
          </div>
        ))
      ) : (
        <p>Nothing to show</p>
      )}
    </div>
  );
};

export default ChatList;
