import React, { useState, useEffect } from "react";
import {
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import moment from "moment";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { HeartInactiveIcon } from "../uiTemplates/icons.js";
import { Avatar, Textarea, Image } from "@nextui-org/react";
import { timeDifference } from "@/utils/timeStamp";

export const CommentCard = ({ comment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(
    comment.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState(comment.likes);

  const timestamp = timeDifference(Date.now(), new Date(comment.createdAt));

  const handleLike = async (id) => {
    const { likes } = comment;
    const { data } = await axios.post(`/api/posts/comments/like`, {
      userId: session.user.id,
      commentId: id,
    });

    console.log(data);
    setCommentLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(session.user.id));
  };

  useEffect(() => {
    setLiked(comment.likes.includes(session && session.user.id));
  }, [session]);

  return (
    <div className=" mr-1 my-1 px-2 rounded-lg py-1 ml-12 bg-primary-springWood bg-opacity-20">
      <article>
        {comment.image && (
          <div className=" w-full">
            <Image
              className=" object-cover rounded-xl bg-black "
              src={comment.image.Location}
              alt=""
              width={300}
              height={200}
              objectFit="cover"
            />
          </div>
        )}
        <p className=" text-lg tracking-wide text-slate-700 font-medium leading-normal py-2 overflow-hidden text-ellipsis">
          {comment.body}
        </p>
      </article>
      <div className=" flex justify-between items-center">
        <Link href={`/${comment.userId.username}`}>
          <a className=" flex justify-start items-center py-2 z-10">
            <Avatar src={comment.userId.image} size="sm" squared />
            <div className=" ml-3 flex justify-center items-center">
              <p className=" tracking-normal text-slate-500 capitalize">
                {comment.userId.name}
              </p>
              <p className=" p-1 text-2xl text-gray-400">&middot;</p>
              <p className="text-slate-400 text-sm font-light">{timestamp}</p>
              {/* <p className=" font-semibold text-gray-400">
                @{comment.userId.username}
              </p> */}
            </div>
          </a>
        </Link>
        <div
          className={` flex items-center  ${
            liked ? "text-red-500" : " text-gray-500"
          }`}
        >
          <span
            onClick={() => {
              setAnimateLike(true);
              handleLike(comment._id);
            }}
            onAnimationEnd={() => setAnimateLike(false)}
            className=" flex items-center p-2 rounded-full bg-slate-50 text-lg mr-2"
          >
            <HeartInactiveIcon animateLike={animateLike} liked={liked} />
            <span
              className={`${commentLikes.length && "ml-1"} ${
                animateLike && ""
              }`}
            >
              {commentLikes.length || ""}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
