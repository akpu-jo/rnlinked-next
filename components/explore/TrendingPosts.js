import axios from "axios";
import { auth } from "firebaseConfig";
import React, { useEffect, useState } from "react";
import { PostCard } from "../post/PostCard";
import WhoToFollow from "./WhoToFollow";

const TrendingPosts = () => {
  const [trending, setTrending] = useState([]);
  const [peopleToFollow, setPeopleToFollow] = useState([]);


  const getTrendingPosts = async () => {
    const { data } = await axios.get("/api/explore/trending");
    console.log("Trending===>", data);
    setTrending(data.posts);
  };
  const getPeopleToFollow = async () => {
    const token = await auth.currentUser.getIdToken(true)
    const { data } = await axios.get("/api/explore/whotofollow", {
      headers: {
        token,
      },
    });
    console.log("for you===>", data);
    setPeopleToFollow(data.users);
  };

  useEffect(() => {
    getTrendingPosts();
    getPeopleToFollow();
  }, []);

  return (
    <div>
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
    </div>
  );
};

export default TrendingPosts;
