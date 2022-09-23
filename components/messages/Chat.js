import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import {
  ChevronLeftIcon,
  DotsVerticalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { io } from "socket.io-client";
import styles from "../../styles/Message.module.css";

import { Loading, Textarea } from "@nextui-org/react";
import Message from "@/components/messages/Message";
import { useSession } from "next-auth/react";
import socket from "@/utils/clientSocket";

const Chat = () => {
  const router = useRouter();
  const { msgId } = router.query;
  const { data: session } = useSession();

  const [chat, setChat] = useState({});
  // const [isGroupChat, setIsGroupChat] = useState(false)
  const [success, setSuccess] = useState(false);
  const [remainingChatImages, setRemainingChatImages] = useState({});
  const [messages, setMessages] = useState([]);

  const [content, setContent] = useState("");
  // const [isMine] = useState(message.sender._id === session.user.id);
  const [chatMeta, setChatMeta] = useState({
    chatName: "ChatName",
    lastSenderId: "",
    otherChatUsers: {},
  });

  const { otherChatUsers } = chatMeta;
  const [typing, setTyping] = useState(false);
  let [timer, setTimer] = useState(null);
  const bottomRef = useRef(null);

  const getChat = async () => {
    const { data } = await axios.get(`/api/messages/${msgId}`);
    console.log(data);
    setChat(data.chat);
    // setIsGroupChat(data.chat.isGroup)
    setRemainingChatImages(data.remainingChatImages);
    data.success &&
      setChatMeta({
        ...chatMeta,
        otherChatUsers: data.otherChatUsers[0].username,
      });
    if (data.success) {
      setSuccess(data.success);
    }
  };

  const joinChatRoom = (chatId) => {
    socket.emit("join room", chatId);
  };

  const getChatMessages = async () => {
    console.log(chat._id);
    const { data } = await axios.get(`/api/messages?chatId=${msgId}`);
    console.log(data);
    setMessages(data.messages);
    bottomRef.current.scrollIntoView();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(`/api/messages`, {
      content,
      chatId: chat._id,
    });
    console.log("newMessage", data);

    if (socket.connected) {
      socket.emit("new message", data.message);
    }

    setMessages((messages) => [...messages, ...[data.message]]);
    setContent("");
    socket.emit("stop typing", chat._id);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLiClassNames = (msg, prevMsg, nxtMsg) => {
    const isMine = msg.sender._id === session.user.id;
    let liClassName = isMine ? "mine" : "theirs";

    let lastSenderId = prevMsg != null ? prevMsg.sender._id : "";
    let currentSenderId = msg.sender._id;
    const nextSenderId = nxtMsg != null ? nxtMsg.sender._id : "";

    const isFirst = lastSenderId !== currentSenderId;
    const isLast = nextSenderId !== currentSenderId;

    if (isFirst) {
      liClassName += " first";
    }
    if (isLast) {
      liClassName += " last";
    }

    if (isFirst && isLast) {
      liClassName += " only";
    }
    return liClassName;
  };

  const handleTyping = (e) => {
    clearTimeout(timer);

    if (!socket.connected) return;

    socket.emit("typing", chat._id);

    setTimer(
      setTimeout(() => {
        socket.emit("stop typing", chat._id);
      }, 3000)
    );
  };

  useEffect(() => {
    getChat();
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    return () => {
      socket.off("typing");
    };
  }, [router]);

  useEffect(() => {
    socket.on("message received", (newMessage) => {
      console.log("New Message==>", newMessage);
      setMessages((messages) => [...messages, ...[newMessage]]);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    getChat();
  }, [router.query]);

  useEffect(() => {
    success && joinChatRoom(msgId);
    success && getChatMessages();
  }, [success, router.query]);

  return (
    <div className=" sm:flex flex-col sm:h-full my-16 sm:my-0 ">
      <header className=" fixed top-0 left-0 right-0 bg-white sm:static flex justify-between items-center border-b h-14 px-3">
        <button
          className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 sm:hidden "
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <ChevronLeftIcon className=" w-5 h-5" />
        </button>

        <ul
          onClick={() => {
            console.log(chat.isGroupChat);
            !chat.isGroupChat && router.push(`/${otherChatUsers}`);
          }}
          className=" flex items-center  "
        >
          <div className=" flex flex-row-reverse  ">
            {success && remainingChatImages !== 0 && (
              <p className=" ml-2 text-sm text-slate-600 font-light flex items-center px-2  rounded-md ">{`+${remainingChatImages}`}</p>
            )}

            {success &&
              chat &&
              chat.chatImages.map((image, i) => (
                <li
                  key={i}
                  className={` ${
                    chat.chatImages.length > 1
                      ? " rounded-xl h-8 w-8 -mr-4  flex "
                      : " w-8 h-8 "
                  } `}
                >
                  <Image
                    className={` ${
                      chat.isGroupChat && styles.imgStyle
                    } img rounded-xl`}
                    src={image}
                    alt="Picture of the logo"
                    width={50}
                    height={50}
                  />
                </li>
              ))}
          </div>
          {success && chat && (
            <div className=" ml-1">
              <p className=" leading-4 capitalize clip-txt-1 text-slate-800 text-base font-normal">
                {chat.chatName}
              </p>
              {!chat.isGroupChat && (
                <span className=" font-light text-slate-400 text-sm flex items-center">
                  {typing ? (
                    <Loading
                      type="points"
                      color="currentColor"
                      size="sm"
                      className=" pt-2"
                    />
                  ) : (
                    <p className=" text-xs">@{otherChatUsers}</p>
                  )}
                </span>
              )}
            </div>
          )}
        </ul>
        <button className=" px-2 ">
          <DotsVerticalIcon className=" w-5 h-5" />{" "}
        </button>
      </header>
      <ul className="  mx-3 sm:pb-2 sm:pt-2 sm:h-0 overflow-y-auto sm:grow ">
        {messages.map((message, i) => (
          <Message
            message={message}
            isGroup={chat && chat.isGroupChat}
            getLiClassNames={getLiClassNames(
              message,
              messages[i - 1],
              messages[i + 1]
            )}
            key={i}
          />
        ))}
        <div ref={bottomRef} />
      </ul>

      <form
        onSubmit={handleSubmit}
        className=" flex justify-between  items-end fixed bottom-0 left-0 right-0 sm:sticky py-3 border-t shadow-sm bg-white "
      >
        <Textarea
          className=" flex-1 text-gray-800 bg-gry-100 p-2 py-1 rounded-sm focus:outline-none "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => handleTyping(e)}
          aria-label="Type you message"
          minRows={1}
          maxRows={3}
          fullWidth={true}
          shadow={false}
          cacheMeasurements={false}
          size="lg"
        />

        <button className=" mr-2 " type="submit">
          <PaperAirplaneIcon className=" text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center " />
        </button>
      </form>
    </div>
  );
};

export default Chat;
