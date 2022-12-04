import { SearchIcon, XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const SearchBox = ({ setRecommendedUsers, setShowSearch }) => {
  const router = useRouter();

  const [query, setQuery] = useState(router.query.q ? router.query.q : "");
  // const [recommendedUsers, ] = useState([])
  let [timer, setTimer] = useState(null);
  const focusSearchRef = useRef();
  const isMobile = useMediaQuery({ maxWidth: 640 });


  const searchTimer = (e) => {
    clearTimeout(timer);

    if (query === "") {
      setRecommendedUsers([]);
    }

    setTimer(
      setTimeout(async () => {
        if (e.target.value.trim() !== "") {
          const url = `/api/explore/users?q=${e.target.value.trim()}`;
          const { data } = await axios.get(url);
          setRecommendedUsers(data.result);
          console.log(e.target.value.trim());
        }
      }, 1000)
    );
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <form
      onSubmit={(e) => submitSearch(e)}
      className=" flex items-center text-lg bg-slate-100 text-slate-600 p-2 rounded-lg w-2/3 max-w-md  "
    >
      <button type="submit" />
      <input
        onClick={() => isMobile && setShowSearch(true)}
        className="bg-slate-100 px-2 border-none focus:outline-none w-full"
        type="text"
        placeholder="Search on rnlinked"
        aria-label="Search for an article"
        value={query}
        ref={focusSearchRef}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => searchTimer(e)}
      />
      {query.length > 0 && (
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuery("");
          }}
          className=" "
        >
          <XCircleIcon className="h-7 w-7 hover:text-primary-brick opacity-90" />
        </button>
      )}
    </form>
  );
};

export default SearchBox;
