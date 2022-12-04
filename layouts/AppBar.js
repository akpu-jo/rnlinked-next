import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import UserOptionsDropdown from "@/components/users/UserOptionsDropdown";

const AppBar = ({ children, extraclass, alt=false, showUser=true }) => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <header
      className={`${extraclass} top-0 right-0 left-0 z-50 py-3 bg-slate-50 border-b`}
    >
      <nav className=" flex justify-between items-center max-w-6xl mx-auto space-x- ">
        <ul className="flex items-center ml-3">
          {alt ? (
            <button
              className=" text-slate-500 rounded-md p-2 bg-slate-100 mr-3 sm:hidden "
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <ChevronLeftIcon className=" w-5 h-5" />
            </button>
          ):  (
            <Link href="/">
              <a className={`${alt && 'hidden sm:block'}`}>
                <Image
                  src="/rn.svg"
                  alt="rnlinked logo"
                  width={60}
                  height={30}
                />
              </a>
            </Link>
          )}
        </ul>

        {children}
        {showUser && <ul className="flex items-center z-20 mr-3">
          {user && <UserOptionsDropdown />}
        </ul>}
      </nav>
    </header>
  );
};

export default AppBar;
