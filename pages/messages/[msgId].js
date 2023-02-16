import Chat from "@/components/messages/Chat";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import Recommendations from "@/components/explore/Recommendations";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon";
import ChatList from "@/components/messages/ChatList";
import SearchChat from "@/components/messages/SearchChat";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import EmptyStates from "@/components/uiTemplates/EmptyStates";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import NewChatModal from "@/components/messages/NewChatModal";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { useMediaQuery } from "react-responsive";
import WithAuth from "@/components/auth/WithAuth";
import ChatLayout from "@/layouts/ChatLayout";

const ChatPage = ({ setVisible, setCloseMethod }) => {
  const { user } = useAuth();

  return <div className=" h-full">{user && <Chat />}</div>;
};

export default ChatPage;

ChatPage.getLayout = function getLayout(page) {
  return <ChatLayout >{page}</ChatLayout>;
};
