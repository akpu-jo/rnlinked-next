import { Tab } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostCard } from "../post/PostCard";
import UserCard from "../users/UserCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchTabs({ cats, children }) {
  const router = useRouter();

  const [searchResult, setSearchResult] = useState({
    posts: [],
    articles: [],
    users: [],
  });

  const loadSearCh = async () => {
    let url;
    const query = router.query.q;

    if (router.query.src === "articles") {
      url = `/api/explore/articles?q=${query}`;
      const { data } = await axios.get(url);
      setSearchResult({ ...searchResult, articles: data.result });
    } else if (router.query.src === "users") {
      url = `/api/explore/users?q=${query}`;
      const { data } = await axios.get(url);
      setSearchResult({ ...searchResult, users: data.result });
    } else {
      url = `/api/explore?q=${query}`;
      const { data } = await axios.get(url);
      setSearchResult({ ...searchResult, posts: data.result });
    }
  };

  useEffect(() => {
    loadSearCh();
  }, [router.query.src]);

  return (
    <div className="w-full max-w-md px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-3 rounded-full ">
          {cats.map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-slate-100 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-elm-400 ring-slate-300 ring-opacity-60",
                  selected
                    ? "bg-slate-900 shadow"
                    : "text-slate-600 bg-slate-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              <div
                onClick={() => {
                  router.replace(
                    `${router.pathname}?q=${
                      router.query.q
                    }&src=${category.toLowerCase()}`
                  );
                }}
              >
                {category}
              </div>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 mb-20">
          <Tab.Panel>
            {searchResult.posts.map((post) => (
              <PostCard post={post} key={post._id} />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {searchResult.articles.map((user) => (
              <UserCard user={user} key={user._id} showBio={true} />
            ))}
          </Tab.Panel>
          <Tab.Panel>
            {searchResult.users.map((user) => (
              <UserCard user={user} key={user._id} showBio={true} />
            ))}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
