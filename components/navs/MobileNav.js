import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import HomeIconUI from "../icons/HomeIconUI";
import SearchIconUI from "../icons/SearchIconUI";
import MessageIcon from "../icons/MessageIcon";
import CreateOptions from "./CreateOptions";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  let slugPath = process.window && window.location.pathname;

  useEffect(() => {
    typeof window !== undefined && setActive(window.location.pathname);
  }, [slugPath]);

  return (
    <>
      <div 
      className=" h-16 sm:hidden fixed bottom-0 right-0 left-0  
      py-2 shadow-lg text-cloud-900 bg-primary-springWood 
      flex justify-around items-center z-50"
      >
        <Link href={`/`}>
          <span className=" p-2 rounded-full bg-slate-100 inline-block text-cloud-900">
            {active === "/" ? <HomeIconUI filled /> : <HomeIconUI />}
          </span>
        </Link>
        <Link
          href={`/explore`}
          className=" p-2 rounded-full bg-slate-100 inline-block "
        >
          {active === "/explore" ? <SearchIconUI filled /> : <SearchIconUI />}
        </Link>

        <Link
          href={`/messages`}
          className=" p-2 rounded-full bg-slate-100 inline-block "
        >
          {active === "/messages" ? <MessageIcon filled /> : <MessageIcon />}
        </Link>
      </div>
    </>
  );
}
