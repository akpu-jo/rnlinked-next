import React, { useRef, useState, useEffect, } from "react";
import { useRouter } from "next/router";
import {
  ArrowNarrowLeftIcon,
  SearchIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import axios from "axios";

const SearchChat = ({ showSearch, setShowSearch, setRecommendedUsers,   focus = false,
}) => {

    const router = useRouter();

    const [query, setQuery] = useState(router.query.q ? router.query.q : "");
    // const [recommendedUsers, ] = useState([])
    let [timer, setTimer] = useState(null);
    const focusSearchRef = useRef();

    useEffect(() => {
      console.log(focusSearchRef)
      focus && focusSearchRef.current.focus();
    }, [])
  
  
    const searchTimer = (e) => {
      clearTimeout(timer);
  
      setTimer(
        setTimeout( async () => {
          console.log(e.keyCode)
          console.log(e.target.value.trim());
          if(e.target.value.trim() === '' && e.keyCode === 8 ){
            return
          }
            console.log(e.keyCode, '<=== after ran')
            const url = `/api/explore/users?q=${e.target.value.trim()}`;
            const { data } = await axios.get(url);
            setRecommendedUsers(data.result);
        }, 1000)
        );
    };
  
    const submitSearch = async (e) => {
      e.preventDefault();
      router.push(`/search?q=${query}`);
      setShowSearch(false)
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
              ref={focusSearchRef}
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
      className={` sticky border-b-2 shadow flex px-3 pb-2 pt- text-2xl font-semibold tracking-wide top-0 right-0 left-0 bg-white z-10`}
    >
        {/* {showSearch && <button onClick={() => setShowSearch(false)}>
          <ArrowNarrowLeftIcon className="w-6 h-6 mr-3 " />
        </button>} */}
        {searchBox()}
    </header>
  )
}

export default SearchChat