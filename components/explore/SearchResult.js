import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import SearchTabs from "./searchTabs";

const SearchResult = () => {
  const [categories] = useState(["Posts", "Articles", "Users"]);

  return (
    <div className=" mt-3">
      <SearchTabs cats={categories}>
        <Tab.Panel><p>postss</p></Tab.Panel>
        <Tab.Panel><p>Articles</p></Tab.Panel>
        <Tab.Panel><p>Users</p></Tab.Panel>
      </SearchTabs>
      SearchResult
    </div>
  );
};

export default SearchResult;
