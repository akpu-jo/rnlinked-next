import { useAuth } from "@/contexts/AuthContext";
import { handleFollowing } from "@/utils/users";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { Avatar } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const UserCard = ({ user, showBio = false, clipBio = false }) => {
  const sessionUser = useAuth().user;
  console.log(sessionUser)

  const [followers, setFollowers] = useState(user.followers);
  const [isFollowing, setIsFollowing] = useState(
    sessionUser && sessionUser.following.includes(user._id)
  );

  const handleFollow = async () => {
    const data = await handleFollowing(user._id, sessionUser._id);

    setIsFollowing(data.followers.includes(sessionUser._id));
  };

  useEffect(() => {
    setIsFollowing(sessionUser && sessionUser.following.includes(user._id));
  }, [sessionUser]);

  return (
    <div className=" py-2 px-2 my-1 md:my-2 mx-3 bg-primary-springWood bg-opacity-30 rounded-lg hover:bg-opacity-60">
      <div className={` flex items-center justify-between `}>
        <Link
          href={`/${user.username}`}
          className=" flex justify-start items-center"
        >
          {user !== undefined && (
            <Avatar zoomed squared size="lg" src={user.image} />
          )}
          <div className=" ml-3">
            <p className=" text-md text-slate-700 font-medium capitalize">
              {user.name}
            </p>
            <p className=" font-semibold text-gray-400 text-sm">
              @{user.username}
            </p>
          </div>
        </Link>
        {sessionUser && sessionUser._id !== user._id && (
          <button
            onClick={() => handleFollow()}
            className=" p-2 bg-slate-100 text-slate-600 font-medium rounded-md mr-5"
          >
            {isFollowing ? (
              <span className="flex items-center">
                <CheckIcon className=" w-5 h-5" />
                Following
              </span>
            ) : (
              <span className=" flex items-center">
                <PlusIcon className=" w-5 h-5" /> Follow
              </span>
            )}
          </button>
        )}
      </div>
      {showBio && (
        <p
          className={`pt-2 py-1 text-slate-800 ${
            clipBio && "clip-txt-2"
          }  text-ellipsis overflow-hidden `}
        >
          {user.bio}
        </p>
      )}
    </div>
  );
};

export default UserCard;
