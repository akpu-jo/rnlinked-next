import Chat from "@/components/messages/Chat";
import AltHeader from "@/components/navs/AltHeader";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Recommendations from "@/components/explore/Recommendations";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon";
import ChatList from "@/components/messages/ChatList";
import SearchChat from "@/components/messages/SearchChat";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import EmptyStates from "@/components/uiTemplates/EmptyStates";
// import {  PencilSquareIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import NewChatModal from "@/components/messages/NewChatModal";

const ChatPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  return (
    <div>
      <header className="hidden sm:block fixed top-0 right-0 left-0 z-50 py-2 sm:bg-slate-100 bg-opacity-70 bg-white ">
        <div className=" flex items-center justify-between max-w-6xl mx-auto px-3 ">
          <button
            className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 sm:hidden "
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <ChevronLeftIcon className=" w-5 h-5" />
          </button>
          <Link href="/">
            <a className="w-36 md:w-44  hidden sm:block ">
              <Image
                src="/rn-logo.png"
                alt="rnlinked logo"
                width={125}
                height={28}
              />
            </a>
          </Link>
          {session && (
            <Link href={`/${session.user.username}`}>
              <a>
                <Avatar squared src={session.user.image} />
              </a>
            </Link>
          )}
        </div>
      </header>
      <div className="  max-w-6xl mx-auto sm:grid grid-cols-11 gap-5 sm:h-screen sm:pt-14">
        <SideNav />
        <main
          className="h-full sm:h-auto md:my-4 sm:ring-1 ring-slate-200 ring-opacity-25 bg-white 
        md:col-span-10 col-span-11 xl:col-span-9 grid grid-cols-5 
        md:rounded-lg sm:shadow-sm overflow-y-hidden  "
        >
          <div className=" hidden sm:flex flex-col h-full sm:col-span-2 border-r box-border ">
            <div className=" flex justify-between items-center border-b space-x-1 h-14 px-3">
              <SearchChat
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                setRecommendedUsers={setRecommendedUsers}
              />
              <button
                type="button"
                className=" pl-1"
                data-hs-overlay="#hs-scroll-inside-body-modal"
              >
                <PencilSquareIcon />
              </button>
            </div>
            <div className=" sm:h-0 overflow-y-auto grow px-3 ">
              <Recommendations recommendedUsers={recommendedUsers} />

              <ChatList />
              <MobileNav />
            </div>
          </div>
          <section className=" col-span-5 sm:col-span-3 md:mb-0 sm:mb-16 ">
            {router.query.msgId !== undefined ? (
              <Chat />
            ) : (
              <EmptyStates
                heading={"Your Messages"}
                message={"Choose an existing conversation or start a new one"}
                btnText={"Send Message"}
                // action={() => router.push("/messages/new")}
                data-hs-overlay="#hs-scroll-inside-body-modal"
              />
            )}
          </section>
          <NewChatModal />

        </main>
      </div>
    </div>
  );
};

export default ChatPage;
