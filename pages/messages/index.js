import Recommendations from "@/components/explore/Recommendations";
import SearchChat from "@/components/messages/SearchChat";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { useState } from "react";

const Inbox = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);


  return (
    <div>
      <AltHeader>
        <p className="">Inbox</p>
        <div className="w-1/3"></div>
        <Link href={"/messages/new"}>
          <a>
            <PencilAltIcon className=" w-7 h-7" />
          </a>
        </Link>
      </AltHeader>
      <SearchChat showSearch={showSearch} setShowSearch={setShowSearch} setRecommendedUsers={setRecommendedUsers} />
      <Recommendations recommendedUsers={recommendedUsers} />
      Inbox
      <MobileNav />
    </div>
  );
};

export default Inbox;
