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

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isBigScreen = useMediaQuery({ minWidth: 1820 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });


  const listChat = async () => {
    const token = await auth.currentUser.getIdToken(true)
    const { data } = await axios.get(
      `/api/messages/get-chats`, {
        headers:{
          token
      }}
      );
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
    listChat()
  }, []);

  return (
    <div className="pb-16">
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
                    size={`${c.chatImages.length > 1 ? "sm" : "lg"}`}
                    squared
                    src={image}
                  />
                ))}
              </Avatar.Group>
            </div>
            <Link
              key={c._id}
              href={
                isMobile ? `/messages/${c._id}` : `/messages?msgId=${c._id}`
              }
              as={`/messages/${c._id}`}
            >
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

export default ChatList;
