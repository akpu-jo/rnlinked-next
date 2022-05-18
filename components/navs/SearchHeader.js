import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  ArrowNarrowLeftIcon,
  SearchIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

const SearchHeader = ({ showSearch, setShowSearch, searchPage = false }) => {
  const router = useRouter();

  const [query, setQuery] = useState(router.query.q ? router.query.q : "");
  let [timer, setTimer] = useState(null);


  const searchTimer = (e) => {
    clearTimeout(timer);

    setTimer(
      setTimeout(() => {
        console.log(e.target.value.trim());
      }, 1000)
    );
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  const searchBox = () => {
    return (
      <form
        onSubmit={(e) => submitSearch(e)}
        className=" flex items-center text-lg bg-slate-100 text-slate-600 p-2 rounded-lg w-full"
      >
        <button type="submit" className="">
          <SearchIcon className="h-7 w-7 hover:text-primary-brick opacity-90" />
        </button>
        <input
        onClick={() => setShowSearch(true)}
          className="bg-slate-100 px-2 border-none focus:outline-none w-full"
          type="text"
          placeholder="Search on RNlinked"
          aria-label="Search for an article"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => searchTimer(e)}
        />
        { query.length > 0 && <button onClick={(e) => {
            e.preventDefault()
            setQuery('')
            }} className=" ">
          <XCircleIcon className="h-7 w-7 hover:text-primary-brick opacity-90" />
        </button>}
      </form>
    );
  };

  return (
    <header
      className={` border-b-2 shadow flex px-3 pb-2 pt-3 text-2xl font-semibold tracking-wide sticky top-0 right-0 left-0 bg-white z-10`}
    >
        {showSearch && <button onClick={() => setShowSearch(false)}>
          <ArrowNarrowLeftIcon className="w-6 h-6 mr-3 " />
        </button>}
        {searchBox()}
    </header>
  );
};

export default SearchHeader;
