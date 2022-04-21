import {
  HomeIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className=" md:hidden sticky bottom-0 right-0 left-0 py-2 shadow-lg text-elm-600 bg-primary-springWood flex justify-around items-center">
      <span className=" p-2 rounded-full bg-slate-100 inline-block">
        <HomeIcon className=" w-8 h-8 text-elm-600" />
      </span>
      <span className=" p-2 rounded-full bg-slate-100 inline-block">
        <SearchCircleIcon className=" w-8 h-8 text-elm-600" />
      </span>
      <div
        onClick={() => {
          setOpen(true);
        }}
        className="add-post bg-elm-900   text-secondary-alto rounded-2xl"
      >
        <Link href={`/new/post`}>
          <a>
            <svg
              className=" w-10 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </a>
        </Link>
      </div>
    </div>
  );
}
