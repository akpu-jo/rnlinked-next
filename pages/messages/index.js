import WithAuth from "@/components/auth/WithAuth";
import Recommendations from "@/components/explore/Recommendations";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon";
import Chat from "@/components/messages/Chat";
import ChatList from "@/components/messages/ChatList";
import NewChatModal from "@/components/messages/NewChatModal";
import SearchChat from "@/components/messages/SearchChat";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import EmptyStates from "@/components/uiTemplates/EmptyStates";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Inbox = ({ openAuthModal, setVisible, setCloseMethod }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1024 });
  const isBigScreen = useMediaQuery({ minWidth: 1820 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isPortrait = useMediaQuery({ orientation: "portrait" });
  const isRetina = useMediaQuery({ minResolution: "2dppx" });

  if (!user) {
    setVisible(true);
    console.log("no user===");
  }else{
    setVisible(false)
  }

  useEffect(() => {
    setCloseMethod( () => () => {
      console.log('closingggg===== >')
      !user? router.push("/") : null;
    } );

  }, []);

  return (
    <div className="">
      <AppBar extraclass={"fixed"} />
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

              {user && <ChatList />}
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

export default WithAuth(Inbox);
