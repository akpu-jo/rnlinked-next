import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";

const Back = ({ topic, rightContent }) => {
  const router = useRouter();
  return (
    <nav className="sticky top-0 z-4 mx- p-3 sm:py- bg-gray-100">
      <ul className=" flex items-center justify-between">
        <ArrowNarrowLeftIcon onClick={() => router.back()} className=" w-7 h-7 text-slate-700" />
        <li className=" font-head text-xl">{topic}</li>
        <li className=" w-1/6 flex justify-end">{rightContent}</li>
      </ul>
    </nav>
  );
};

export default Back;
