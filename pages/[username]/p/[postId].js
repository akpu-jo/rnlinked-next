import Header from "@/components/navs/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChatIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import AltHeader from "@/components/navs/AltHeader";
import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/post/CommentCard";
import { Textarea, Avatar } from "@nextui-org/react";
import { useSession, getSession } from "next-auth/react";
import PostPageTemplate from "@/components/post/PostPageTemplate";


const PostPage = ({ post }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  const loadComments = async () => {
    const { data } = await axios.get(`/api/comments?postId=${post._id}`);
    console.log(data);
    setComments(data.comments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/comments`, {
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
      <PostPageTemplate post={post} />
    </div>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  console.log(context.params);
  const postId = context.params.postId;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/posts/${postId}`
  );
  console.log("post  ===> ", data);

  // if (!post) {
  //   return { 
  //     notFound: true,
  //   };
  // }

  return {
    props: {
      post: data.post,
    },
  };
};
