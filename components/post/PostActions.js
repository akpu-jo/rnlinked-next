import React from "react";
import { useRouter } from "next/router";
import { ChatIcon, HeartIcon } from "@heroicons/react/outline";

const PostActions = ({likes, comments, postId}) => {
    const router = useRouter()

  return (
    <div className=" flex justify-between items-center">
      <div className=" flex items-center text-gray-500 ">
        <span className=" flex items-center p-2 rounded-full bg-slate-50 text-xl mr-2">
          <HeartIcon className=" w-7 h-7" />
          <p className=" mx-2">{likes}</p>
        </span>
        <span
          onClick={() => router.push(`/new/comment/${postId}`)}
          className=" flex items-center p-2 rounded-full bg-slate-50 text-xl "
        >
          <ChatIcon className=" w-8 h-8" />
          <p className=" mx-2">{comments}</p>
        </span>
      </div>
      <div className="text-gray-400">
        <p>{moment(post.updatedAt).fromNow()}</p>
      </div>
    </div>
  );
};

export default PostActions;
