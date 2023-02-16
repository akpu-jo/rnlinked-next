import Recommendations from "@/components/explore/Recommendations";
import SearchBox from "@/components/explore/SearchBox";
import TrendingPosts from "@/components/explore/TrendingPosts";
import WhoToFollow from "@/components/explore/WhoToFollow";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import SearchHeader from "@/components/navs/SearchHeader";
import SideNav from "@/components/navs/SideNav";
import { PostCard } from "@/components/post/PostCard";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { timeDifference } from "@/utils/timeStamp";
import { SearchIcon } from "@heroicons/react/outline";
import { Avatar, Card, Container } from "@nextui-org/react";
import axios from "axios";
import { auth } from "firebaseConfig";
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

  const getIdToken = async () => {
    return await auth.currentUser.getIdToken(true);
  };
  const getTrendingPosts = async () => {
    const token = await auth.currentUser.getIdToken(true);
    const { data } = await axios.get("/api/explore/trending", {
      headers: {
        token,
      },
    });
    console.log("Trending===>", data);
    setTrending(data.posts);
  };

  const getPostsForYou = async () => {
    const token = await auth.currentUser.getIdToken(true);

    const { data } = await axios.get("/api/explore/foryou", {
      headers: {
        token,
      },
    });
    console.log("for you===>", data);
    setPostsForYou(data.posts);
  };

  const getPeopleToFollow = async () => {
    const token = await auth.currentUser.getIdToken(true);

    const { data } = await axios.get(`/api/explore/whotofollow`, {
      headers: {
        token,
      },
    });
    setPeopleToFollow(data.users);
  };

  const forYou = (post) => {
    const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

    return (
      <div className=" flex justify-between items-center my-3 border-b border-slate-100 py-2">
        <div>
          <div className={` flex items-center `}>
            <Link
              href={`/${post.userId.username}`}
              className="flex justify-start items-center z-10"
            >
              <Avatar src={post.userId.image} squared size="sm" zoomed />
              <div className=" ml-2">
                <p className=" tracking-normal text-slate-500 capitalize">
                  {post.userId.name}
                </p>
                {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
              </div>
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
    <div className=" flex flex-col h-screen bg-slate-50">
      {showSearch ? (
        <SearchHeader
          showSearch={showSearch}
          setShowSearch={setShowSearch}
          setRecommendedUsers={setRecommendedUsers}
        />
      ) : (
        <AppBar>
          <SearchBox
            setRecommendedUsers={setRecommendedUsers}
            setShowSearch={setShowSearch}
          />
        </AppBar>
      )}

      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <main className=" mb-24 col-span-6 ">
          {recommendedUsers.length ? (
            <Recommendations recommendedUsers={recommendedUsers} />
          ) : (
            <>
              <section>
                <h2 className=" mx-3 text-slate-500 font-medium tracking-normal py-2 my-1">
                  TRENDING
                </h2>
                <div className=" flex overflow-x-scroll hide-scrollbar ">
                  {trending.map((post) => (
                    <PostCard post={post} key={post._id} fullW={false} />
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
                  <div key={post._id}>{forYou(post)}</div>
                ))}
              </section>
            </>
          )}
        </main>
        <section className=" hidden lg:block sticky top-16  col-span-3 bg-slate-40 mt-2 bg-white rounded-xl p-5 max-h-96">
          {/* <TrendingPosts /> */}
        </section>
      </div>
      <p className=" flex-1 text-center text-xl font-medium p-2 m-10 "></p>
      <MobileNav />
    </div>
  );
};

// Explore.getLayout = function getLayout(page) {
//   return <AppBar>{page}</AppBar>;
// };
export default Explore;
