import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { io } from "socket.io-client";
import styles from "../../styles/Message.module.css";
import { createEditor, Editor, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { serialize } from "@/utils/functions";

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
    const { data } = await axios.get(`/api/messages?chatId=${chat._id}`);
    console.log(data);
    setMessages(data.messages);
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
    bottomRef.current?.scrollIntoView();
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
    socket.on("message received", (newMessage) => {
      console.log("New Message==>", newMessage);
      setMessages((messages) => [...messages, ...[newMessage]]);
    });
    return () => {
      socket.off("typing");
    };
  }, []);


  useEffect(() => {
    getChat();
  }, [router.query]);

  useEffect(() => {
    success && joinChatRoom(chat._id);
    success && getChatMessages();
  }, [success]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" flex flex-col h-screen">
      <AltHeader>
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
          {success && (
            <div className=" ml-1">
              <p className=" leading-4 capitalize clip-txt-1 text-slate-800 text-base font-normal">
                {chat.chatName}
              </p>
              {!chat.isGroupChat && (
                <span className=" font-light text-slate-400 text-sm">
                  {typing ? (
                    <Loading type="points" color="currentColor" />
                  ) : (
                    <p>@{otherChatUsers}</p>
                  )}
                </span>
              )}
            </div>
          )}
        </ul>

        <div
          className={` ${success && chat.isGroupChat ? "w-1/5" : "w-1/3"}`}
        ></div>
      </AltHeader>

      <ul className=" flex-1  mx-3">
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
        className=" w-screen flex justify-between  items-end sticky bottom-0 right-0 left-0  py-3 border-t shadow-md bg-white "
      >
        <Textarea
          className=" ml- flex-1 text-gray-800 w- overflow-y-auto bg-gry-100 p-2 py-1 rounded-sm focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => handleTyping(e)}
          aria-label="Type you message"
          minRows={1}
          maxRows={3}
          fullWidth={true}
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
