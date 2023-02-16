import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { Avatar, Textarea, Image } from "@nextui-org/react";
import { timeDifference } from "@/utils/timeStamp";
import HeartInactiveIcon from "../icons/HeartInactiveIcon";
import parse from "html-react-parser";
import { useAuth } from "@/contexts/AuthContext";

export const CommentCard = ({ comment }) => {
  const router = useRouter();
  const { user } = useAuth();

  const [liked, setLiked] = useState(comment.likes.includes(user && user._id));
  const [animateLike, setAnimateLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState(comment.likes);

  const timestamp = timeDifference(Date.now(), new Date(comment.createdAt));

  const handleLike = async (id) => {
    const { likes } = comment;
    const { data } = await axios.post(`/api/comments/like`, {
      userId: user._id,
      commentId: id,
    });

    console.log(data);
    setCommentLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(user._id));
  };

  useEffect(() => {
    setLiked(comment.likes.includes(user && user._id));
  }, [user]);

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
        <p className=" pt-2 py-1 text-slate-800 text-ellipsis overflow-hidden ">
          {parse(comment.body)}
        </p>
      </article>
      <div className=" flex justify-between items-center">
        <Link
          href={`/${comment.userId.username}`}
          className=" flex justify-start items-center py-2 z-10"
        >
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
