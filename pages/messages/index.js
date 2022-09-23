import Recommendations from "@/components/explore/Recommendations";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon";
import Chat from "@/components/messages/Chat";
import ChatList from "@/components/messages/ChatList";
import NewChatModal from "@/components/messages/NewChatModal";
import SearchChat from "@/components/messages/SearchChat";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import EmptyStates from "@/components/uiTemplates/EmptyStates";
import { ChevronLeftIcon, PencilAltIcon } from "@heroicons/react/outline";
// import {  PencilSquareIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Inbox = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isBigScreen = useMediaQuery({ minWidth: 1820 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  return (
    <div className="">
      <header className="fixed top-0 right-0 left-0 z-50 py-2 sm:bg-slate-100 bg-opacity-70 bg-white ">
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
      <NewChatModal />

      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5 h-screen md:pt-14 pt-14 ">
        <SideNav />
        <main className="h-full sm:h-auto md:my-4 ring-1 ring-slate-200 ring-opacity-25 bg-white md:col-span-10 col-span-11 xl:col-span-9 grid grid-cols-5 md:grid-cols-6  md:rounded-lg shadow-sm overflow-y-hidden  ">
          <div className=" flex flex-col h-full sm:col-span-2 col-span-5 border-r box-border">
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
          <section className=" col-span-3 md:col-span-4 hidden sm:block mb-16 md:mb-0 ">
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
        </main>
      </div>
    </div>
  );
};

export default Inbox;
