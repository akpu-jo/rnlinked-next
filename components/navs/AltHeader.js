import React from "react";
import { useRouter } from "next/router";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { ChevronLeftIcon } from "@heroicons/react/outline";

export default function AltHeader ({ children }) {
  const router = useRouter();

  return (
    <header className=" flex justify-between items-center px-3 pb-2 pt-3 text-2xl font-semibold tracking-wide sticky top-0 right-0 left-0 mb-4 bg-white z-20">
      <button
      className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        <ChevronLeftIcon className=" w-5 h-5" />
        {/* <ArrowNarrowLeftIcon className="w-8 h-8 " /> */}
      </button>
      {children}
    </header>
  );
}
