import React from "react";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";

export default function AltHeader({ children, extraClass }) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <header
      className={`${extraClass} top-0 right-0 left-0 z-50 py-2 bg-slate-50 border-b`}
    >
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
        <Link href="/" className=" hidden sm:block ">
          <Image src="/rn.svg" alt="rnlinked logo" width={60} height={30} />
        </Link>
        {children}
      </div>
    </header>
  );
}
