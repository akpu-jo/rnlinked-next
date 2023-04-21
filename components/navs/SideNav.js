import { NewspaperIcon, PencilAltIcon } from "@heroicons/react/outline";
import { useModal } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import HomeIconUI from "../icons/HomeIconUI";
import MessageIcon from "../icons/MessageIcon";
import SearchIconUI from "../icons/SearchIconUI";
import SettingsIcon from "../icons/SettingsIcon";
import NewPostModal from "../post/NewPostModal";
import MenuOptions from "./MenuOptions";

const SideNav = ({ showText = true }) => {
  const [active, setActive] = useState("");
  let slugPath = process.window && window.location.pathname;

  const isActive = (path) => {
    return active.includes(path);
  };

  const { setVisible, bindings } = useModal();

  useEffect(() => {
    typeof window !== undefined && setActive(window.location.pathname);
  }, [slugPath]);

  return (
    <section className=" hidden md:block sticky top-20 col-span-1 xl:col-span-2 bg-slate-60 mt-5 space-y-5 g-white rounded-lg p-4 max-h-80 ">
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
      <MenuOptions
        text={`Messages`}
        icon={isActive("messages") ? <MessageIcon filled /> : <MessageIcon />}
        link="/messages"
        active={isActive("messages")}
      />

      <button
        type="button"
        onClick={() => setVisible(true)}
        className={` ${
          isActive("new/post") && " bg-elm-200 hover:bg-elm-300 text-slate-800"
        } flex items-center space-x-4 hover:bg-elm-100 rounded-lg p-1 w-fit xl:w-full px-2`}
      >
        <PencilAltIcon className=" w-7 h-7" />{" "}
        <p
          className={` hidden xl:block text- font- tracking-wide ${
            isActive("new/post") && " font-semibold"
          } `}
        >
          Short post
        </p>
      </button>
      <NewPostModal setVisible={setVisible} bindings={bindings} />
      <MenuOptions
        text={`Write article`}
        icon={<NewspaperIcon className=" w-7 h-7" />}
        link="/new/article"
        active={isActive("/new/article")}
      />
      <MenuOptions
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
      />
    </section>
  );
};

export default SideNav;
