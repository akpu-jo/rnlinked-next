import {
  NewspaperIcon,
  PencilAltIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { Avatar, Tooltip, useModal } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import HomeIconUI from "../icons/HomeIconUI";
import MessageIcon from "../icons/MessageIcon";
import SearchIconUI from "../icons/SearchIconUI";
import SettingsIcon from "../icons/SettingsIcon";
import NewPostModal from "../post/NewPostModal";
import MenuOptions from "./MenuOptions";
import UserOptionsDropdown from "../users/UserOptionsDropdown";
import { useAuth } from "@/contexts/AuthContext";
import NotificationIcon from "../icons/NotificationIcon";
import Link from "next/link";
import Image from "next/image";

const SideNav = ({ showUser = true, colSpan }) => {
  const { user } = useAuth();

  const [active, setActive] = useState("");
  let slugPath = process.window && window.location.pathname;

  const isActive = (path) => {
    return active.includes(path);
  };

  const { setVisible, bindings } = useModal();

  useEffect(() => {
    typeof window !== undefined && setActive(window.location.pathname);
  }, [slugPath]);

  const userIcon = () => {
    return (
      <Avatar
        zoomed
        className=""
        squared
        size="md"
        icon={
          !user.image && <UserCircleIcon className=" w-10 h-10 opacity-50 " />
        }
        src={user.image}
      />
    );
  };
  return (
    <section className={` hidden sm:block sticky top-0 border-r h-screen  ${colSpan ? colSpan : 'col-span-1 xl:col-span-3'} bg-slate-60 space-y-5 g-white rounded-lg p-4  bg-slate-60 `}>
      {showUser && (
        <Link href="/" className={`flex items-center gap-4 -ml-3`}>
          <Image
            src="/icon-192x192.png"
            alt="rnlinked logo"
            width={50}
            height={50}
          />
          <h1 className=" hidden xl:block font-head font-semibold text-3xl lowercase tracking-tight">
            RNLinked.
          </h1>
        </Link>
      )}
      <div className=" pt-20" />
      {/* {user && showUser && (
        <div>
          <li className=" flex  items-center gap-2 bg-primary-springWood hover:bg-tradewind-200 py-1  rounded-lg">
            <Avatar
              zoomed
              className=""
              squared
              size="md"
              icon={
                !user.image && (
                  <UserCircleIcon className=" w-10 h-10 opacity-50 " />
                )
              }
              src={user.image}
            />
            <div className="">
              <p className=" tracking-tight leading-5 text-lg">{user.name}</p>
              <p className=" font-semibold text-gray-400">@{user.username}</p>
            </div>
          </li>
        </div>
      )} */}

      <div className=" pt-4" />
      <MenuOptions
        text={`Home`}
        icon={active === "/" ? <HomeIconUI filled /> : <HomeIconUI />}
        link="/"
        active={active === "/"}
      />
      <MenuOptions
        text={`Explore`}
        icon={isActive("/explore") ? <SearchIconUI filled /> : <SearchIconUI />}
        link="/explore"
        active={isActive("/explore")}
      />

      <Tooltip content={"Coming soon"} trigger="click">
        <div
          className={`flex items-center space-x-4 hover:bg-elm-100 rounded-lg p-1 w-fit xl:w-full px-2`}
        >
          <span className="">
            <NotificationIcon />{" "}
          </span>
          <p className={` hidden xl:block text- font- tracking-wide `}>
            Notifications
          </p>
        </div>
      </Tooltip>

      <MenuOptions
        text={`Messages`}
        icon={isActive("messages") ? <MessageIcon filled /> : <MessageIcon />}
        link="/messages"
        active={isActive("messages")}
      />
      <MenuOptions
        text={`Profile`}
        icon={userIcon()}
        link={`/${user.username}`}
        active={isActive(`${user.username}`)}
      />

      {/* <MenuOptions
        text={`Notifications`}
        icon={
          isActive("notifications") ? (
            <NotificationIcon filled />
          ) : (
            <NotificationIcon />
          )
        }
        link="/#"
        active={isActive("notifications")}
      /> */}

      {/* <MenuOptions
        text={`Settings`}
        icon={
          isActive("/account/profile") ? (
            <SettingsIcon filled />
          ) : (
            <SettingsIcon />
          )
        }
        link={`/account/profile`}
        active={isActive("/account/profile")}
      /> */}
    </section>
  );
};

export default SideNav;
