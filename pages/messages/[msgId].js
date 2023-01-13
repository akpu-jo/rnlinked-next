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

const ChatPage = ({ setVisible, setCloseMethod }) => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  if (!user) {
    setVisible(true);
  } else {
    setVisible(false);
  }

  useEffect(() => {
    setCloseMethod(() => () => {
      !user ? router.push("/") : null;
    });
  }, []);

  return (
    <div>
      {!isMobile && <AppBar extraclass={"fixed"} />}
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

              {user && <ChatList />}
              <MobileNav />
            </div>
          </div>
          <section className=" col-span-5 sm:col-span-3 md:mb-0 sm:mb-16 ">
            {router.query.msgId !== undefined ? (
              <>{user && <Chat />}</>
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

export default WithAuth(ChatPage);
