import Recommendations from "@/components/explore/Recommendations";
import SearchResult from "@/components/explore/searchResult";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import React, { useState } from "react";

const SearchPage = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div>
      <SearchHeader
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchPage={true}
      />
      {showSearch ? <Recommendations /> : <SearchResult />}
      <MobileNav />
    </div>
  );
};

export default SearchPage;
