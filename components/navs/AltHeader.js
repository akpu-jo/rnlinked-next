import React from "react";
import { useRouter } from "next/router";
import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";

export default function ({ children }) {
  const router = useRouter();

  return (
    <header className=" flex justify-between items-center px-3 pb-2 pt-3 text-2xl font-semibold tracking-wide sticky top-0 right-0 left-0 mb-4 bg-white z-10">
      <button onClick={(e) => {
        e.preventDefault()
        window.history.back()
        }}>
        <ArrowNarrowLeftIcon className="w-8 h-8 " />
      </button>
      {children}
    </header>
  );
}
