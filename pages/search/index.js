import Recommendations from "@/components/explore/Recommendations";
import SearchResult from "@/components/explore/searchResult";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import React, { useState } from "react";

const SearchPage = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);

  return (
    <div>
      <SearchHeader
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        searchPage={true}
        setRecommendedUsers={setRecommendedUsers}
      />
      {showSearch ? (
        <Recommendations recommendedUsers={recommendedUsers} />
      ) : (
        <SearchResult />
      )}
      <MobileNav />
    </div>
  );
};

export default SearchPage;
