import { useAuth } from "@/contexts/AuthContext";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useMediaQuery } from "react-responsive";

const UserOptionsDropdown = () => {
  const { user, signout } = useAuth();
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div className={` ${!isMobile && 'hs-dropdown'}  relative inline-flex [--trigger:hover] [--placement:bottom-right]`}>
      <button
        id="hs-dropdown-hover-event"
        type="button"
        className="hs-dropdown-toggle"
        onClick={() => router.push(`/${user.username}`)}
      >
        <Avatar
          icon={
            !user.image && <UserCircleIcon className=" w-10 h-10 opacity-50 " />
          }
          squared
          src={user.image}
        />
      </button>
      <ul className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-max bg-white shadow-md rounded-lg py-4 px-6 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700 text-slate-600">
        <li className=" flex py-2 items-center bg-primary-springWood bg-opacity-90 rounded-lg">
          <Avatar
            zoomed
            className=" ml-3"
            squared
            size="lg"
            icon={
              !user.image && (
                <UserCircleIcon className=" w-10 h-10 opacity-50 " />
              )
            }
            src={user.image}
          />
          <div className=" px-3">
            <p className=" font-medium tracking-wide leading-5 text-lg">
              {user.name}
            </p>
            <p className=" font-semibold text-gray-400">@{user.username}</p>
          </div>
        </li>
        <li className=" border-b border-slate-200 py-3 mt-3 text-xl tracking-wide hover:font-medium hover:text-slate-800 ">
          <Link href={`/${user.username}`}>
            <a>Profile</a>
          </Link>
        </li>
        <li className=" border-b border-slate-200 py-3 mt-3 text-xl tracking-wide hover:font-medium hover:text-slate-800 ">
          <Link href={`/account/profile`}>
            <a>Edit profile</a>
          </Link>
        </li>
        <li className=" border-b border-slate-200 py-3 mt-5 text-xl tracking-wide hover:font-medium hover:text-slate-800">
          Help and Feedback
        </li>
        <li className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
          Privacy policy
        </li>
        <li className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
          Terms of service
        </li>
        <li className=" mt-10 py-3 text-secondary-burntSienna  text-xl tracking-wide font-semibold ">
          <span onClick={() => signout()}>Log Out</span>
        </li>
      </ul>
    </div>
  );
};

export default UserOptionsDropdown;
