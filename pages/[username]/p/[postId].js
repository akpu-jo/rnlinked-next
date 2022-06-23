import Header from "@/components/navs/Header";
import connectDb from "@/utils/db";
import axios from "axios";
import Post from "models/postModel";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import moment from "moment";
import AltHeader from "@/components/navs/AltHeader";
import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/post/CommentCard";
import { Textarea, Avatar } from "@nextui-org/react";
import { useSession, getSession } from "next-auth/react"
import { NextPageContext } from "next"

const PostPage = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  const loadComments = async () => {
    const { data } = await axios.get(`/api/posts/comments?postId=${post._id}`);
    console.log(data);
    setComments(data.comments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/posts/comments`, {
      body,
      userId: session.user.id,
      postId: post._id,
    });

    console.log(data);
    setComments((comments) => [...[data.comment], ...comments]);
    setBody("");
  };
  useEffect(() => {
    loadComments();
    console.log(post._id);
  }, []);

  return (
    <div className=" flex flex-col h-screen">
      <AltHeader>
        <Link href={`/${session.user.username}`}>
          <a>
            <Avatar squared src={session.user.image} />
          </a>
        </Link>{" "}
      </AltHeader>
      <main className=" flex-1">
        <PostCard post={post} clipText={false} />
        <div className=" mx-3">
          {comments.length > 0 &&
            comments.map((comment, i) => (
              <CommentCard comment={comment} key={i} />
            ))}
        </div>
      </main>
      <form
        onSubmit={handleSubmit}
        className=" z-50 flex justify-between  items-end sticky bottom-0 right-0 left-0  py-3 border-t shadow-md bg-white "
      >
        <Textarea
          className=" ml- flex-1 text-gray-800 w-full  overflow-y-auto bg-gry-100 p-2 py-1 rounded-sm focus:outline-none"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          aria-label="Type you message"
          minRows={1}
          maxRows={3}
          fullWidth={true}
          cacheMeasurements={false}
          placeholder="Type your comment.."
        />

        <button className="mr-2 " type="submit">
          <PaperAirplaneIcon className=" text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center " />
        </button>
      </form>
    </div>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const postId = context.params.postId;


  const { data } = await axios.get(`https://rnlinked.vercel.app/api/posts/${postId}`);



  // if (!post) {
  //   return {
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      post: data.post,
      session: await getSession(context),
    },
  };
};
