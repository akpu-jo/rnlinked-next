import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { HeartInactiveIcon } from "../uiTemplates/icons";
import { timeDifference } from "@/utils/timeStamp";

export const PostCard = ({ post, showAtions = true, clipText = true }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(
    post.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);

  const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  const handleLike = async (id) => {
    const { likes } = post;
    const { data } = await axios.post(`/api/posts/like`, {
      userId: session.user.id,
      postId: id,
    });

    console.log(data);
    setPostLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(session.user.id));
  };

  useEffect(() => {
    setLiked(post.likes.includes(session && session.user.id));
  }, [session]);

  return (
    <div id={post._id} className="py-4 border-b">
      <div className=" mx-3">
        <article>
          {post.image.length > 0 && (
            <div className=" w-full">
              <Image
                className=" object-cover rounded-2xl w-full bg-black "
                src={post.image[0].Location}
                alt=""
                width={400}
                height={250}
              />
            </div>
          )}
          <p
            onClick={() =>
              router.push(`/${post.userId.username}/p/${post._id}`)
            }
            id="test"
            className={`${
              clipText && "clip-txt"
            } text-xl text-gray-500 font-medium leading-normal py-2 overflow-hidden text-ellipsis`}
          >
            {post.body}
          </p>
        </article>
        {session && showAtions && (
          <div className=" flex justify-between items-center">
            <div className={` flex items-center `}>
              <Link href={`/${post.userId.username}`}>
                <a className=" flex justify-start items-center">
                  <Image
                    className=" rounded-xl"
                    src={post.userId.image}
                    alt="Picture of the logo"
                    width={30}
                    height={30}
                  />
                  <div className=" ml-2">
                    <p className=" text-md text-slate-500 capitalize">{post.userId.name}</p>
                    {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
                  </div>
                </a>
              </Link>
              <p className=" p-1 text-2xl text-gray-400">&middot;</p>
              <p className="text-slate-400 text-md">{timestamp}</p>
            </div>
            <div
              className={` flex items-center  ${
                liked ? "text-red-500" : " text-gray-500"
              }`}
            >
              <span
                onClick={() => {
                  setAnimateLike(true);
                  handleLike(post._id);
                }}
                className={` flex items-center p-2 text-lg mr-2`}
                onAnimationEnd={() => setAnimateLike(false)}
              >
                <HeartInactiveIcon animateLike={animateLike} liked={liked} />
                <span
                  className={`${postLikes.length && "ml-1"} ${
                    animateLike && ""
                  }`}
                >
                  {postLikes.length || ""}
                </span>
              </span>
              <span
                onClick={() => router.push(`/new/comment/${post._id}`)}
                className=" flex items-center p-2  text-lg text-gray-500 "
              >
                <ChatIcon className=" w-5 h-5" />
                <p className="">{post.comments.length || ""}</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
