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
import AltHeader from "@/components/navs/AltHeader";
import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/post/CommentCard";

const PostPage = ({ p }) => {
  const post = JSON.parse(p);
  const router = useRouter();

  const [comments, setComments] = useState([]);


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
      <AltHeader />
      <PostCard post={post} clipText={false} />
      <div className=" mx-3">
        {comments.length > 0 &&
          comments.map((comment, i) => (
            <CommentCard comment={comment} key={i} />
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
