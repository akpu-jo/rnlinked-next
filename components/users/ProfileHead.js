import React, { useEffect, useState } from "react";
import { CheckIcon, PaperAirplaneIcon, PlusIcon, UsersIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";

export const ProfileHead = ({user}) => {

  const router = useRouter();
  const { data: session } = useSession(); 
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(session && session.user.id)
  );
  // const [animateLike, setAnimateLike] = useState(false);
  const [followers, setFollowers] = useState(user.followers);

  // const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  const handleFollow = async () => {
    // const { likes } = post;
    const { data } = await axios.post(`/api/users/${user._id}/follow`, {
      sessionUserId: session.user.id,
    });

    console.log(data);
    setFollowers(data.followers);
    // setAnimateLike(!data.isliked);
    setIsFollowing(data.followers.includes(session.user.id));
  };

  useEffect(() => {
    setIsFollowing(user.followers.includes(session && session.user.id));
  }, [session, router.query.src]);


  return (
    <>
      <figure className=" flex justify-center items-start">
        <Image
          className=" rounded-3xl "
          src={user.image}
          alt="Picture of the logo"
          width={100}
          height={100}
        />
        <figcaption className=" ml-6">
          <p className=" font-semibold text-lg">{user.name}</p>
          <p className=" font-semibold text-gray-400">@{user.username}</p>
          <div className="flex items-center justify-start my-3">
            <button onClick={() => handleFollow()} className=" p-2 bg-slate-100 text-slate-600 font-medium rounded-md mr-5">
              { isFollowing? <span className="flex items-center"><CheckIcon className=" w-5 h-5" />
              Following</span> : <span className=" flex items-center"><PlusIcon className=" w-5 h-5" /> Follow</span> }
            </button>
            <Link href={`/messages/${user._id}`}>
            
            <a className=" p-2 bg-primary-elm text-slate-200 rounded-md">
              <PaperAirplaneIcon className=" w-6 h-6 rotate-45" />
            </a>
            </Link>
          </div>
        </figcaption>
        {user.bio && <p className="text-gray-400">{user.bio}</p>}
      </figure>
      <div className=" flex justify-around m-3 bg-slate-50 p-3 text-gray-500 rounded-xl ">
        <p>
          <span className=" text-slate-900 font-medium ">{followers.length}</span> Followers
        </p>{" "}
        <span className=" border-r-2 border-gray-300" />
        <p>
          <span className=" text-slate-900 font-medium ">{user.following.length}</span> Following{" "}
        </p>
      </div>
    </>
  );
};
