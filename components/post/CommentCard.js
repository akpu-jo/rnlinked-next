import React, { useState, useEffect } from "react";
import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { HeartInactiveIcon } from "../uiTemplates/icons";

export const CommentCard = ({ comment }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(
    comment.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState(comment.likes);

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
    <div className=" mx-3 ml-12">
      <hr className=" p-2"></hr>

      <Link href={`/${comment.userId.username}`}>
        <a className=" flex justify-start items-center py-2">
          <Image
            className=" rounded-xl"
            src={comment.userId.image}
            alt="Picture of the logo"
            width={30}
            height={30}
          />
          <div className=" ml-3 flex justify-center items-center">
            <p className=" font-semibold text-lg">{comment.userId.name}</p>
            <span className=" bg-gray-300 rounded-full w-1 h-1 m-2"></span>
            <p className=" font-semibold text-gray-400">
              @{comment.userId.username}
            </p>
          </div>
        </a>
      </Link>

      <article>
        {comment.image && (
          <div className=" w-full">
            <Image
              className=" object-cover rounded-md w-full bg-black "
              src={comment.image.Location}
              alt=""
              width={400}
              height={250}
            />
          </div>
        )}
        <p className=" text-xl text-gray-500 font-medium leading-normal py-2 overflow-hidden text-ellipsis">
          {comment.body}
        </p>
      </article>
      <div className=" flex justify-between items-center">
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
            <span className={`${commentLikes.length && "ml-1"} ${animateLike && ""}`}>{commentLikes.length || ''}</span>
          </span>
        </div>
        <div className="text-gray-400">
          <p>{moment(comment.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};
