import { handleFollowing } from "@/utils/users";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const UserCard = ({ user, showBio = false }) => {
  const { data: session } = useSession();

  const [followers, setFollowers] = useState(user.followers);
  const [isFollowing, setIsFollowing] = useState(
    user.followers.includes(session && session.user.id)
  );

  const handleFollow = async () => {

    const data = await handleFollowing(user._id, session.user.id)

    setIsFollowing(data.followers.includes(session.user.id));
  };

  useEffect(() => {
    setIsFollowing(user.followers.includes(session && session.user.id)); 
  }, [session]);

  return (
    <div className=" py-2 my-3 mx-2">
      <div className={` flex items-center justify-between `}>
        <Link href={`/${user.username}`}>
          <a className=" flex justify-start items-center">
            {user !== undefined && (
              <Image
                className=" rounded-xl"
                src={user.image}
                alt="Picture of the logo"
                width={30}
                height={30}
              />
            )}
            <div className=" ml-3">
              <p className=" text-md text-slate-700 font-medium capitalize">
                {user.name}
              </p>
              <p className=" font-semibold text-gray-400 text-sm">
                @{user.username}
              </p>
            </div>
          </a>
        </Link>
        {session && session.user.id !== user._id && <button
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
        </button>}
      </div>
      {showBio && <p className=" pt-2 py-1 text-slate-800 clip-txt-2 text-ellipsis overflow-hidden ">
        Danielle Newnham Host of Danielle Newnham Podcast — interviews with tech
        founders and innovators. Writer. Author. Recovering Founder.
      </p>}
    </div>
  );
};

export default UserCard;
