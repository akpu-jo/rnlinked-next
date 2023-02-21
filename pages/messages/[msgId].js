import Chat from "@/components/messages/Chat";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ChatLayout from "@/layouts/ChatLayout";
import axios from "axios";
import { getCookie } from "cookies-next";

const ChatPage = ({ chat, conversations, remainingChatImages, otherChatUsers }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(conversations)

  return (
    <div className=" h-full">
      {user && (
        <Chat
          chat={chat}
          messages={messages}
          setMessages={setMessages}
          remainingChatImages={remainingChatImages}
          otherChatUsers={otherChatUsers[0].username}
        />
      )}
    </div>
  );
};

ChatPage.getLayout = function getLayout(page) {
  return <ChatLayout>{page}</ChatLayout>;
};
export default ChatPage;

export const getServerSideProps = async ({ req, res, query }) => {
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

  return {
    props: {
      chat: chatResult.data.chat,
      remainingChatImages: chatResult.data.remainingChatImages,
      otherChatUsers: chatResult.data.otherChatUsers,
      conversations: msgResult.data.messages,
    },
  };
};
