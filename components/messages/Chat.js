import {
  ChevronLeftIcon,
  DotsVerticalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Message.module.css";

import { Loading, Textarea } from "@nextui-org/react";
import Message from "@/components/messages/Message";
import socket from "@/utils/clientSocket";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "firebaseConfig";
import { useMediaQuery } from "react-responsive";

const Chat = ({
  chat,
  currentChatId,
  messages,
  setMessages,
  remainingChatImages,
  otherChatUsers,
  bottomRef,
}) => {
  const router = useRouter();
  const { msgId } = router.query;

  const { user } = useAuth();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  // const [chat, setChat] = useState(conversation);
  const [sending, setSending] = useState(false);
  // const [remainingChatImages, setRemainingChatImages] = useState({});
  // const [messages, setMessages] = useState([]);

  const [content, setContent] = useState("");
  // const [chatMeta, setChatMeta] = useState({
  //   chatName: "ChatName",
  //   lastSenderId: "",
  //   otherChatUsers: {},
  // });

  // const { otherChatUsers } = chatMeta;
  const [typing, setTyping] = useState(false);
  let [timer, setTimer] = useState(null);
  const scroll = useRef();

  // const bottomRef = useRef(null);

  // const getChat = async () => {
  // const token = await auth.currentUser.getIdToken(true);
  // const { data } = await axios.get(`/api/messages/${msgId}`, {
  //   headers: {
  //     token,
  //   },
  // });
  // console.log(data);
  // setChat(data.chat);
  // setIsGroupChat(data.chat.isGroup)
  // setRemainingChatImages(data.remainingChatImages);
  // data.success &&
  //   setChatMeta({
  //     ...chatMeta,
  //     otherChatUsers: data.otherChatUsers[0].username,
  //   });
  // if (data.success) {
  //   setSuccess(data.success);
  // }
  // };

  // const getChatMessages = async () => {
  // const token = await auth.currentUser.getIdToken(true);
  // const { data } = await axios.get(`/api/messages?chatId=${msgId}`, {
  //   headers: {
  //     token,
  //   },
  // });
  // setMessages(data.messages);
  // console.log("bottomRef======>", bottomRef);
  // bottomRef.current.scrollIntoView();
  // };

  const addMessageToChat = (newMessage) => {
    messages.push(newMessage);
    // setMessages((messages) => [...messages, ...[newMessage]]);
    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const invalid = sending || !content.replace(/\s/g, "").length;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSending(true);
    if (!content.replace(/\s/g, "").length) {
      return setSending(false);
    }
    const token = await auth.currentUser.getIdToken(true);
    const { data } = await axios.post(
      `/api/messages`,
      {
        content,
        chatId: chat._id,
      },
      {
        headers: {
          token,
        },
      }
    );

    if (socket.connected) {
      const socketData = {
        message: data.message,
        chatId: chat._id,
      };
      socket.emit("new message", socketData);
    }

    // addMessageToChat(data.message);
    setMessages((messages) => [...messages, ...[data.message]]);
    // bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    setContent("");
    socket.emit("stop typing", chat._id);
    setSending(false);
  };

  const getLiClassNames = (msg, prevMsg, nxtMsg) => {
    const isMine = msg.sender._id === user._id;
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
    const showTypingIndicator = (room) => {
      if (room !== currentChatId) return;
      setTyping(true);
    };
    socket.on("typing", showTypingIndicator);
    socket.on("stop typing", () => setTyping(false));

    return () => {
      socket.off("typing", showTypingIndicator);
    };
  }, [currentChatId]);

  useEffect(() => {
    // console.log("useEffect called with chatId", currentChatId);

    const handleMessageReceived = (socketData) => {
      const { message, chatId } = socketData;
      // console.log("message received for chatId", chatId);
      if (chatId !== currentChatId) return;
      setMessages((messages) => [...messages, message]);
    };

    socket.on("message received", handleMessageReceived);

    return () => {
      socket.off("message received", handleMessageReceived);
    };
  }, [currentChatId]);

  useEffect(() => {
    scroll.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const joinChatRoom = (chatId) => {
      socket.emit("join chat", chatId);
    };

    joinChatRoom(msgId);
    // success && getChatMessages();
  }, [router.query.msgId]);

  return (
    <div className=" sm:flex flex-col sm:h-full mt-20 sm:my-0 ">
      <header className=" fixed top-0 left-0 right-0 bg-white sm:static flex justify-between items-center border-b h-16 px-3">
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
            {remainingChatImages !== 0 && (
              <p className=" ml-2 text-sm text-slate-600 font-light flex items-center px-2  rounded-md ">{`+${remainingChatImages}`}</p>
            )}

            {chat &&
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
          {chat && (
            <div
              className={` ${
                remainingChatImages !== 0 || !chat.isGroupChat ? "ml-2" : "ml-5"
              } `}
            >
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
      <ul className="  mx-3 sm:pt-2 sm:h-0 overflow-y-auto sm:grow ">
        {messages.map((message, i) => (
          <li key={i} ref={scroll}>
            <Message
              message={message}
              isGroup={chat && chat.isGroupChat}
              getLiClassNames={getLiClassNames(
                message,
                messages[i - 1],
                messages[i + 1]
              )}
            />
          </li>
        ))}
        <div className="pt-20 sm:pt-10" ref={bottomRef} />
      </ul>

      <form
        onSubmit={handleSubmit}
        className=" flex justify-between  items-end fixed bottom-0 left-0 right-0 sm:sticky py-3 border-t shadow-sm bg-white "
      >
        <Textarea
          className=" flex-1 text-gray-800 bg-gry-100 p-2 py-1 rounded-sm focus:outline-none "
          value={content}
          onChange={(e) => setContent(e.target.value)}
          // onKeyDown={(e) => handleTyping(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isMobile) {
              handleSubmit(e);
            }
            handleTyping(e);
          }}
          aria-label="Type you message"
          minRows={1}
          maxRows={3}
          fullWidth={true}
          shadow={false}
          cacheMeasurements={false}
          size="lg"
        />

        <button className=" mr-2 " type="submit" disabled={invalid}>
          <PaperAirplaneIcon
            className={`${
              invalid && "cursor-not-allowed opacity-50"
            } text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center "`}
          />
        </button>
      </form>
    </div>
  );
};

export default Chat;
