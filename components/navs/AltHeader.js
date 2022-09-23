import React from "react";
import { useRouter } from "next/router";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

export default function AltHeader({ children }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <header className=" fixed top-0 right-0 left-0 z-5 py-2 bg-slate-100 ">
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
  );
}
