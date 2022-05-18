import Recommendations from "@/components/explore/Recommendations";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";

const Explore = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      {showSearch ? (
        <div>
          <SearchHeader
            showSearch={showSearch}
            setShowSearch={setShowSearch}
          />{" "}
          <Recommendations />{" "}
        </div>
      ) : (
        <div>
          <AltHeader>
            <p className="">Explore</p>
            <SearchIcon
              onClick={async () => setShowSearch(true)}
              className=" w-7 h-7"
            />
          </AltHeader>
          Explore contents
        </div>
      )}
      <MobileNav />
    </div>
  );
};

export default Explore;
