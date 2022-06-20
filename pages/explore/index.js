import Recommendations from "@/components/explore/Recommendations";
import WhoToFollow from "@/components/explore/WhoToFollow";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import { PostCard } from "@/components/post/PostCard";
import { timeDifference } from "@/utils/timeStamp";
import { SearchIcon } from "@heroicons/react/outline";
import { Avatar, Card, Container } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Explore = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [trending, setTrending] = useState([]);
  const [postsForYou, setPostsForYou] = useState([]);
  const [peopleToFollow, setPeopleToFollow] = useState([]);

  const getTrendingPosts = async () => {
    const { data } = await axios.get("/api/explore/trending");
    console.log("Trending===>", data);
    setTrending(data.posts);
  };

  const getPostsForYou = async () => {
    const { data } = await axios.get("/api/explore/foryou");
    console.log("for you===>", data);
    setPostsForYou(data.posts);
  };

  const getPeopleToFollow = async () => {
    const { data } = await axios.get("/api/explore/whotofollow");
    console.log("for you===>", data);
    setPeopleToFollow(data.users);
  };

  const forYou = (post) => {
    const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

    return (
      <div className=" flex justify-between items-center my-3 border-b border-slate-100 py-2">
        <div>
          <div className={` flex items-center `}>
            <Link href={`/${post.userId.username}`}>
              <a className=" flex justify-start items-center z-10">
                <Avatar src={post.userId.image} squared size="sm" zoomed />
                <div className=" ml-2">
                  <p className=" tracking-normal text-slate-500 capitalize">
                    {post.userId.name}
                  </p>
                  {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
                </div>
              </a>
            </Link>
            <p className=" p-1 text-2xl text-gray-400">&middot;</p>
            <p className="text-slate-400 text-sm font-light">{timestamp}</p>
          </div>
          <p
            onClick={() =>
              router.push(`/${post.userId.username}/p/${post._id}`)
            }
            className=" flex-1 text-xl tracking-wide text-slate-800 txt-clip-2 py-1"
          >
            {post.body}
          </p>
        </div>
        <div>
          {post.image.length > 0 && (
            <Avatar
              squared
              css={{ size: "$24" }}
              src={post.image[0].Location}
            />
          )}
        </div>
      </div>
    );
  };

  useEffect(() => {
    getTrendingPosts();
    getPostsForYou();
    getPeopleToFollow();
  }, []);

  return (
    <div className=" flex flex-col h-screen">
      {showSearch ? (
        <SearchHeader
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setRecommendedUsers={setRecommendedUsers}
        />
      ) : (
        <AltHeader>
          <p className=" text-xl">Explore</p>
          <SearchIcon
            onClick={async () => setShowSearch(true)}
            className=" w-7 h-7"
          />
        </AltHeader>
      )}
      {recommendedUsers.length > 0 ? (
        <Recommendations recommendedUsers={recommendedUsers} />
      ) : (
        <main className="">
          <section>
            <h2 className=" mx-3 text-slate-500 font-medium tracking-normal py-2 my-1">
              TRENDING
            </h2>
            <div className=" flex overflow-x-scroll hide-scrollbar ">
              {trending.map((post) => (
                <PostCard post={post} key={post._id} />
              ))}
            </div>
          </section>
          <section className=" mx-4 my-5">
            <h2 className=" text-slate-500 font-medium tracking-normal py-2 my-1">
              PEOPLE TO FOLLOW
            </h2>
            <div className=" flex flex-wrap justify-evenly  ">
              {peopleToFollow.map((user) => (
                <WhoToFollow key={user._id} user={user} />
              ))}
            </div>
          </section>
          <section className=" mx-4 my-3 ">
            <h2 className=" text-slate-500 font-medium tracking-normal py-2">
              FOR YOU
            </h2>
            {postsForYou.map((post) => (
              <div key={post._id} >{forYou(post)}</div>
            ))}
          </section>
        </main>
      )}
      <p className=" flex-1 text-center text-xl font-medium p-2 m-10"></p>
      <MobileNav />
    </div>
  );
};

export default Explore;
