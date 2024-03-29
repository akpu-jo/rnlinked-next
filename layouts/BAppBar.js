import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import UserOptionsDropdown from "@/components/users/UserOptionsDropdown";

export const APP_BAR_HEIGHT = "2rem";

const BAppBar = ({ children, extraclass, alt = false, showUser = true }) => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <header
      className={`${extraclass} inset-0 z-50 border-b`}
    >
      <nav
        className=" flex justify-between items-center max-w-6xl mx-auto bg-slate-50 "
        style={{ height: APP_BAR_HEIGHT }}
      >
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
          ) : (
            <Link href="/" className={`${alt && "hidden sm:block"}`}>
              <Image src="/logo/rnl.svg" alt="rnlinked logo" width={125} height={80} />
            </Link>
          )}
        </ul>

        {children}
        {showUser && (
          <ul className="flex items-center z-20 mr-3">
            {user && <UserOptionsDropdown />}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default BAppBar;
