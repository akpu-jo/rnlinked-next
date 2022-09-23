import Header from "@/components/navs/Header";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ChatIcon,
  ChevronLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import AltHeader from "@/components/navs/AltHeader";
import { PostCard } from "@/components/post/PostCard";
import { CommentCard } from "@/components/post/CommentCard";
import { Textarea, Avatar } from "@nextui-org/react";
import { useSession, getSession } from "next-auth/react";
import PostPageTemplate from "@/components/post/PostPageTemplate";
import SideNav from "@/components/navs/SideNav";

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
    <div className=" bg-slate-50">
      <header className=" fixed top-0 right-0 left-0 z-5 py-2 bg-slate-100 ">
        <div className=" flex items-center justify-between max-w-6xl mx-auto px-3 ">
          <button
            className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 sm:hidden "
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <ChevronLeftIcon className=" w-5 h-5" />
          </button>
          <Link href="/">
            <a className="w-36 md:w-44  hidden sm:block ">
              <Image
                src="/rn-logo.png"
                alt="rnlinked logo"
                width={125}
                height={28}
              />
            </a>
          </Link>
          {session && (
            <Link href={`/${session.user.username}`}>
              <a>
                <Avatar squared src={session.user.image} />
              </a>
            </Link>
          )}
        </div>
      </header>
      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <PostPageTemplate post={post} />
      </div>
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
