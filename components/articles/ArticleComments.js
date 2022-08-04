import { timeDifference } from "@/utils/timeStamp";
import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import HeartInactiveIcon from "../icons/HeartInactiveIcon";
import parse from "html-react-parser";
import axios from "axios";

const ArticleComments = ({ comment }) => {
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
    const { data } = await axios.post(`/api/comments/like`, {
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
    <div className=" text-slate-600 border-b py-2 mb-2 ">
      <section className=" flex py-1 items-center bg-primary-springWoo bg-opacity-90 rounded-lg">
        <Avatar zoomed squared size="md" src={comment.userId.image} />
        <div className=" px-3">
          <p className=" font-medium tracking-wide leading-5 text-md">
            {comment.userId.name}
          </p>
          <p className=" font-semibold text-gray-400">
            @{comment.userId.username}
          </p>
        </div>
      </section>
      <p className=" pt-2 py-1 text-slate-800 text-ellipsis overflow-hidden ">
        {parse(comment.body)}
      </p>
      <div className=" flex items-center justify-end">
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
            className={` flex items-center p-2 text-lg mr-2`}
            onAnimationEnd={() => setAnimateLike(false)}
          >
            <HeartInactiveIcon
              animateLike={animateLike}
              liked={liked}
              size="h-6 w-6"
            />
            <span
              className={`${commentLikes.length && "ml-2"} ${
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

export default ArticleComments;
