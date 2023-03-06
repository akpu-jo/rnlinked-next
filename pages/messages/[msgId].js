import Chat from "@/components/messages/Chat";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ChatLayout from "@/layouts/ChatLayout";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const ChatPage = ({ chat, conversations, remainingChatImages, otherChatUsers, currentChatId }) => {
  const { user } = useAuth();
  const router = useRouter()
  const [messages, setMessages] = useState(conversations)
  const bottomRef = useRef(null);

   useEffect(() => {
    setMessages(conversations)
  }, [router.query]);

  return (
    <div className=" h-full">
      {user && (
        <Chat
          chat={chat}
          currentChatId={currentChatId}
          messages={messages}
          setMessages={setMessages}
          remainingChatImages={remainingChatImages}
          otherChatUsers={otherChatUsers[0].username}
          bottomRef={bottomRef}
        />
      )}
    </div>
  );
};

ChatPage.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};
export default ChatPage;

export const getServerSideProps = async ( context) => {
  const { req, res, query, resolvedUrl } = context
  // console.log('ctx /messages/[msgId]:42 ====>', context)
  const { msgId } = query;

  const token = getCookie("token", { req, res });

  const getChat = () => {
    return axios.get(`${process.env.NEXT_PUBLIC_URL}/api/messages/${msgId}`, {
      headers: {
        token,
      },
    });
  };

  const getMessages = () => {
    return axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/messages?chatId=${msgId}`,
      {
        headers: {
          token,
        },
      }
    );
  };

  
  const [chatResult, msgResult] = await Promise.all([getChat(), getMessages()]);

  // console.log('chatResult=====>', req)
  const encodedPath = encodeURIComponent(resolvedUrl)

  if(chatResult.data.tokenExpired){
    return{
      redirect: {
        destination: `/refresh?redirect=${encodedPath}`,
        permanent: false
      }
    }
  }

  return {
    props: {
      chat: chatResult.data.chat,
      remainingChatImages: chatResult.data.remainingChatImages,
      otherChatUsers: chatResult.data.otherChatUsers,
      conversations: msgResult.data.messages,
      currentChatId: msgId
    },
  };
};
