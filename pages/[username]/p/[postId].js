import Header from "@/components/navs/Header";
import connectDb from "@/utils/db";
import axios from "axios";
import Post from "models/postModel";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { ChatIcon, HeartIcon } from "@heroicons/react/outline";
import moment from "moment";

const PostPage = ({ p }) => {
  const post = JSON.parse(p);
  const router = useRouter();

  const [comments, setComments] = useState([]);

  const handleLike = (id) => {
    console.log("liked", id);
  }; 

  const loadComments = async () => {
    const { data } = await axios.get(`/api/posts/comments?postId=${post._id}`);
    console.log(data);
    setComments(data.comments);
  };

  useEffect(() => {
    loadComments();
    console.log(post._id);
  }, []);

  return (
    <div>
      <Header />
      <div className=" mx-3">
        <Link href={`/${post.userId.username}`}>
          <a className=" flex justify-start items-center py-4">
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
          <p className=" text-xl text-gray-500 font-medium leading-normal py-2 overflow-hidden text-ellipsis">
            {post.body}
          </p>
        </article>
        <div className=" flex justify-between items-center">
          <div className=" flex items-center text-gray-500 ">
            <span
              onClick={() => handleLike(post._id)}
              className=" flex items-center p-2 rounded-full bg-slate-50 text-xl mr-2"
            >
              <HeartIcon className=" w-7 h-7" />
              <p className=" mx-2">{post.likes.length}</p>
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
        {comments.length > 0 &&
          comments.map((comment, i) => (
            <div key={i} className=" mx-3 ml-12">
              <hr className=" p-2"></hr>

              <Link href={`/${comment.userId.username}`}>
                <a className=" flex justify-start items-center py-2">
                  <Image
                    className=" rounded-2xl"
                    src={comment.userId.image}
                    alt="Picture of the logo"
                    width={40}
                    height={40}
                  />
                  <div className=" ml-3 flex justify-center items-center">
                    <p className=" font-semibold text-lg">
                      {comment.userId.name}
                    </p>
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
                <div className=" flex items-center text-gray-500 ">
                  <span className=" flex items-center p-2 rounded-full bg-slate-50 text-lg mr-2">
                    <HeartIcon className=" w-5 h-5" />
                    <p className=" mx-2">{comment.likes.length}</p>
                  </span>
                  {/* <span className=" flex items-center p-2 rounded-full bg-slate-50 text-xl ">
              <ChatIcon className=" w-8 h-8" />
              <p className=" mx-2">{post.comments.length}</p>
            </span> */}
                </div>
                <div className="text-gray-400">
                  <p>{moment(post.updatedAt).fromNow()}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const postId = context.params.postId;

  await connectDb();

  const post = await Post.findById(postId).populate(
    "userId",
    "name username image"
  );

  // const result =   await axios.get(``)

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      p: JSON.stringify(post),
    },
  };
};
