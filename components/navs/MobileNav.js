import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import HomeIconUI from "../icons/HomeIconUI";
import SearchIconUI from "../icons/SearchIconUI";
import MessageIcon from "../icons/MessageIcon";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  let slugPath = process.window && window.location.pathname;

  useEffect(() => {
    typeof window !== undefined && setActive(window.location.pathname);
  }, [slugPath]);

  return (
    <div className=" md:hidden sticky bottom-0 right-0 left-0  py-2 shadow-lg text-cloud-900 bg-primary-springWood flex justify-around items-center z-50">
      <Link href={`/`}>
        <a>
          <span className=" p-2 rounded-full bg-slate-100 inline-block text-cloud-900">
            {active === "/" ? <HomeIconUI filled /> : <HomeIconUI />}
          </span>
        </a>
      </Link>
      <Link href={`/explore`}>
        <a className=" p-2 rounded-full bg-slate-100 inline-block ">
          {active === "/explore" ? <SearchIconUI filled /> : <SearchIconUI />}
        </a>
      </Link>

      <Link href={`/messages`}>
        <a className=" p-2 rounded-full bg-slate-100 inline-block ">
          {active === "/messages" ? <MessageIcon filled /> : <MessageIcon />}
        </a>
      </Link>

      <div
        onClick={() => {
          setOpen(true);
        }}
        className="add-post  text-cloud-900 "
      >
        <Link href={`/new/post`}>
          <a>
            <Avatar
              bordered
              icon={
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
                    strokeWidth={1}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              }
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
