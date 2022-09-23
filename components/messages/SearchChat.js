import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SearchIcon, XCircleIcon } from "@heroicons/react/outline";
import axios from "axios";

const SearchChat = ({
  focusSearchRef,
  selectedUsers,
  handleSelectedUsers,
  showSearch,
  setShowSearch,
  setRecommendedUsers,
  focus = false,
  scrollIntoViewref
}) => {
  const router = useRouter();

  const [query, setQuery] = useState(router.query.q ? router.query.q : "");
  let [timer, setTimer] = useState(null);

  useEffect(() => {
    focus && focusSearchRef.current.focus();
  }, []);

  // useEffect(() => {
  //   // 👇️ scroll to bottom every time messages change
  //   scrollIntoViewref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [selectedUsers]);

  const searchTimer = (e) => {
    clearTimeout(timer);

    setTimer(
      setTimeout(async () => {
        console.log(e.keyCode);
        console.log(e.target.value.trim());
        if (e.target.value.trim() === "" && e.keyCode === 8) {
          return;
        }
        console.log(e.keyCode, "<=== after ran");
        const url = `/api/explore/users?q=${e.target.value.trim()}`;
        const { data } = await axios.get(url);
        setRecommendedUsers(data.result);
      }, 1000)
    );
  };

  const submitSearch = async (e) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
    setShowSearch(false);
  };

  const searchBox = () => {
    return (
      <form
        onSubmit={(e) => submitSearch(e)}
        className=" flex items-center text-lg bg-slate-100 text-slate-600 p-1 rounded-md w-full"
      >
        <button type="submit" className="">
          <SearchIcon className="h-7 w-7 hover:text-primary-brick opacity-90" />
        </button>
        <input
          onClick={() => setShowSearch(true)}
          className="bg-slate-100 px-2 border-none focus:outline-none w-full text-lg placeholder:text-sm"
          type="text"
          placeholder="Search in messages"
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

  return (
    <header
      className={` py-2 pt- text-2xl font-semibold tracking-wide  bg-white z-10 flex-1 `}
    >
      {searchBox()}
      <div className=" flex overflow-x-scroll hide-scrollbar mt-1  ">
        <div className=" flex flex-nowrap">
          {selectedUsers &&
            selectedUsers.map((user, i) => (
              <button
                key={i}
                className="  flex items-center justify-between  mr-2 mb-2 p-2 rounded-sm text-base text-slate-500 bg-gray-200 hover:bg-gray-300"
              >
                <p className="flex-1 w-fit whitespace-nowrap">{user.name}</p>
                <XCircleIcon
                  onClick={() => {
                    handleSelectedUsers(user);
                  }}
                  className="h-5 w-5 pl-2 text-gray-600"
                />
              </button>
            ))}
        </div>
          <div ref={scrollIntoViewref} />
      </div>
    </header>
  );
};

export default SearchChat;
