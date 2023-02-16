import { useAuth } from "@/contexts/AuthContext";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { Avatar, Card } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const WhoToFollow = ({ user }) => {
  const sessionUser = useAuth().user;
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(sessionUser && sessionUser._id)
  );
  const [followers, setFollowers] = useState(user.followers);

  const handleFollow = async () => {
    // const { likes } = post;
    const { data } = await axios.post(`/api/users/${user._id}/follow`, {
      sessionUserId: sessionUser._id,
    });

    console.log(data);
    setFollowers(data.followers);
    // setAnimateLike(!data.isliked);
    setIsFollowing(data.followers.includes(sessionUser._id));
  };

  useEffect(() => {
    setIsFollowing(user.followers.includes(sessionUser && sessionUser._id));
  }, [sessionUser]);

  return (
    <div className=" z-10 w-36 h-56 flex flex-col justify-between items-center m-2 rounded-lg bg-primary-springWood bg-opacity-50 py-4 px-5 border border-slate-200 ">
      <Link href={`/${user.username}`} className=" flex flex-col">
        <Avatar css={{ size: "$20" }} squared src={user.image} />
        <div className=" text-slate-800 mt-2 text-center w-36  ">
          <p className=" text-lg leading-4 font-medium capitalize">
            {user.name}
          </p>
          <p className=" clip-txt-1 text-gray-500 ">@{user.username}</p>
        </div>
      </Link>

      <button
        onClick={() => handleFollow()}
        className=" bg-cloud-900 text-slate-600 font-medium rounded-md"
      >
        {isFollowing ? (
          <span className="flex items-center justify-center text-gray-50 bg-cloud-900 text-center p-1 rounded-md text-lg font-semibold tracking-wide ">
            <CheckIcon className=" w-5 h-5" />
            Following
          </span>
        ) : (
          <span className=" flex items-center justify-center text-gray-50 bg-cloud-900 text-center p-1 rounded-md text-lg font-semibold tracking-wide ">
            <PlusIcon className=" w-5 h-5" /> Follow
          </span>
        )}
      </button>
    </div>
  );
};

export default WhoToFollow;
