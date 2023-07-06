import WithAuth from "@/components/auth/WithAuth";
import Recommendations from "@/components/explore/Recommendations";
import PencilSquareIcon from "@/components/icons/PencilSquareIcon";
import ChatList from "@/components/messages/ChatList";
import NewChatModal from "@/components/messages/NewChatModal";
import SearchChat from "@/components/messages/SearchChat";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import BAppBar, { APP_BAR_HEIGHT } from "./AppBar";

const ChatLayout = ({
  children,
  setVisible,
  setCloseMethod,
  // chatPage = false,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  const chatPage = router.query.msgId !== undefined ? true : false;

  

  useEffect(() => {
    const authSubcribe = () => {
      if (!user) {
        setVisible(true);
        console.log("no user===");
      } else {
        setVisible(false);
      }
    }

    authSubcribe()
  
    return () => {
      authSubcribe()
    }
  }, [])
  

  useEffect(() => {
    setCloseMethod(() => () => {
      console.log("closingggg===== >");
      !user ? router.push("/") : null;
    });
  }, []);

  return (
    <>
      {<BAppBar extraclass={` ${chatPage && isMobile && "hidden"} sticky`} />}
      <NewChatModal />
      <div className=" max-w-6xl mx-auto sm:fixed ">
        <div
          className={`sm:grid grid-cols-11 gap-4 ${!isMobile && "fixed"}`}
          style={{ height: `calc(100% - ${APP_BAR_HEIGHT})` }}
        >
          <SideNav showUser={false} />
          <aside
            className={` ${
              chatPage ? "hidden sm:block " : ""
            } col-span-3 h-full overflow-y-auto border-slate-500`}
          >
            <div className=" border-l border-r-2 h-full">
              <div className=" flex justify-between items-center border-b  space-x-1 h-16 px-3">
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
              <div className=" sm:h- overflow-y-auto grow px-3">
                <Recommendations recommendedUsers={recommendedUsers} />

                {user && <ChatList />}
                <MobileNav />
              </div>
            </div>
          </aside>
          <main
            className={` ${
              chatPage ? `h-full ${isMobile && "w-screen"} ` : "hidden sm:block"
            } col-span-6  border-slate-500`}
          >
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default WithAuth(ChatLayout);
