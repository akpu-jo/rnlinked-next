import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  PaperAirplaneIcon,
  PlusIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@nextui-org/react";
import WithAuth from "../auth/WithAuth";

const ProfileHead = ({
  profileUser,
  isSessionUser,
  setVisible,
  setCloseMethod,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(
    profileUser.followers.includes(user && user._id)
  );
  // const [animateLike, setAnimateLike] = useState(false);
  const [followers, setFollowers] = useState(profileUser.followers);

  // const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  // if (!user) {
  //   setVisible(true);
  // } else {
  //   setVisible(false);
  // }

  const handleFollow = async () => {
    // const { likes } = post;
    const { data } = await axios.post(`/api/users/${profileUser._id}/follow`, {
      sessionUserId: user._id,
    });

    console.log(data);
    setFollowers(data.followers);
    // setAnimateLike(!data.isliked);
    setIsFollowing(data.followers.includes(user._id));
  };

  const followCountJsx = (followType, count) => {
    return (
      <Link
        href={`/${profileUser.username}/${followType}`}
        className=" capitalize hover:bg-elm-100 hover:bg-opacity-40 hover:font-semibold active:bg-opacity-60 px-5 py-1 rounded-sm"
      >
        <span className=" text-slate-900 font-medium ">{count}</span>{" "}
        {followType}
      </Link>
    );
  };
  useEffect(() => {
    setIsFollowing(profileUser.followers.includes(user && user._id));
  }, [user, router.query.src]);

  return (
    <div className="flex flex-col items-center ">
      <figure className=" flex justify-center items-start">
        {profileUser.image === "" ? (
          <Avatar
            zoomed
            className=" ml-3"
            squared
            css={{ size: "$24" }}
            icon={
              user &&
              !user.image && (
                <UserCircleIcon className=" w-24 h-24 opacity-20 " />
              )
            }
          />
        ) : (
          <Avatar src={profileUser.image} css={{ size: "$20" }} squared/>
          // <Image
          //   className=" rounded-3xl "
          //   src={profileUser.image}
          //   alt="Picture of the logo"
          //   width={100}
          //   height={500}
          // />
        )}
        <figcaption className=" ml-6">
          <p className=" font-semibold text-lg">{profileUser.name}</p>
          <p className=" font-semibold text-gray-400">
            @{profileUser.username}
          </p>
          {!isSessionUser ? (
            <div className="flex items-center justify-start my-3">
              <button
                onClick={() => {
                  user ? handleFollow() : setVisible(true);
                }}
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
              <Link
                href={`/messages/${profileUser._id}`}
                className=" p-2 bg-primary-elm text-slate-200 rounded-md"
              >
                <PaperAirplaneIcon className=" w-6 h-6 rotate-45" />
              </Link>
            </div>
          ) : (
            <Link
              href={`/account/profile`}
              className=" flex items-center py-2 px-4 bg-slate-100 text-slate-600 font-medium rounded-md mr-5"
            >
              Edit profile
            </Link>
          )}
        </figcaption>
      </figure>
      {profileUser.bio && (
        <p className="text-gray-500 text-center py-2 my-1 whitespace-pre-line">
          {profileUser.bio}
        </p>
      )}
      <div className=" flex justify-around max-w-md w-96 m-3 bg-slate-50 p-3 text-gray-500 rounded-xl ">
        {followCountJsx("followers", followers.length)}
        <span className=" border-r-2 border-gray-300" />
        {followCountJsx("following", profileUser.following.length)}
      </div>
    </div>
  );
};

export default WithAuth(ProfileHead);
