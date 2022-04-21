import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";

export const PostCard = ({ post, showAtions = true }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [liked, setLiked] = useState(post.likes)

  const handleLike = async (id) => {
    const { likes } = post;
    console.log("liked", id, likes);
    if (likes.includes(session.user.id)) {
      const { data } = await axios.post(`/api/posts/unlike`, {
        userId: session.user.id,
        postId: id,
      });
      console.log(data);
    } else {
      const { data } = await axios.post(`/api/posts/like`, {
        userId: session.user.id,
        postId: id,
      });
      console.log(data);
      if(data.ok){
        setLiked((liked) => [...liked, session.user.id])

        console.log(likes.push(session.user.id))
      }
      console.log(false);
    }
  };

  return (
    <div className=" mx-3 pb-4">
      {post.likes}
      <Link href={`/${post.userId.username}`}>
        <a className=" flex justify-start items-center pb-4">
          <Image
            className=" rounded-2xl"
            src={post.userId.image}
            alt="Picture of the logo"
            width={50}
            height={50}
          />
          <div className=" ml-3">
            <p className=" font-semibold text-lg">{post.userId.name}</p>
            <p className=" font-semibold text-gray-400">
              @{post.userId.username}
            </p>
          </div>
        </a>
      </Link>
      <article>
        {post.image.length > 0 && (
          <div className=" w-full">
            <Image
              className=" object-cover rounded-md w-full bg-black "
              src={post.image[0].Location}
              alt=""
              width={400}
              height={250}
            />
          </div>
        )}
        <p
          onClick={() => router.push(`/${post.userId.username}/p/${post._id}`)}
          className=" clip-txt text-xl text-gray-500 font-medium leading-normal py-2 overflow-hidden text-ellipsis"
        >
          {post.body}
        </p>
      </article>
      {showAtions && (
        <div className=" flex justify-between items-center">
          <div className=" flex items-center text-gray-500 ">
            <span
              onClick={() => handleLike(post._id)}
              className=" flex items-center p-2 rounded-full bg-slate-50 text-xl mr-2"
            >
              <HeartIcon className=" w-7 h-7" />
              <p className=" mx-2">{liked.length}</p>
            </span>
            <span
              onClick={() => router.push(`/new/comment/${post._id}`)}
              className=" flex items-center p-2 rounded-full bg-slate-50 text-xl "
            >
              <ChatIcon className=" w-8 h-8" />
              <p className=" mx-2">{post.comments.length}</p>
            </span>
          </div>
          <div className="text-gray-400">
            <p>{moment(post.createdAt).fromNow()}</p>
          </div>
        </div>
      )}
    </div>
  );
};
