import { Tab } from "@headlessui/react";
import React, { useState } from "react";
import SearchTabs from "./SearchTabs";

const SearchResult = () => {
  const [categories] = useState(["Posts", "Articles", "Users"]);

  return (
    <div className=" mt-3">
      <SearchTabs cats={categories} />
    </div>
  );
};

export default SearchResult;
