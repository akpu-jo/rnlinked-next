import Recommendations from "@/components/explore/Recommendations";
import SearchBox from "@/components/explore/SearchBox";
import SearchResult from "@/components/explore/SearchResult";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import SideNav from "@/components/navs/SideNav";
import AppBar from "@/layouts/AppBar";
import React, { useState } from "react";

const SearchPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  return (
    <div>
      {showSearch ? (
        <SearchHeader
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          searchPage={true}
          setRecommendedUsers={setRecommendedUsers}
        />
      ) : (
        <AppBar>
          <SearchBox
            setRecommendedUsers={setRecommendedUsers}
            setShowSearch={setShowSearch}
          />
        </AppBar>
      )}

      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <main className=" col-span-7">
          {showSearch ? (
            <Recommendations recommendedUsers={recommendedUsers} />
          ) : (
            <SearchResult />
          )}
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default SearchPage;
