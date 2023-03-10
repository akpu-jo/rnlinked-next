import axios from "axios";
import React from "react";
import PostPageTemplate from "@/components/post/PostPageTemplate";
import SideNav from "@/components/navs/SideNav";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { useMediaQuery } from "react-responsive";
import MobileNav from "@/components/navs/MobileNav";

const PostPage = ({ post, replies }) => {
  const { user } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div className=" bg-slate-50">
      <AppBar alt={isMobile} extraclass={''} />
      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <PostPageTemplate post={post} replies={replies} />
      </div>
      <MobileNav user={user} />
    </div>
  );
};

export default PostPage;

export const getServerSideProps = async (context) => {
  const postId = context.params.postId;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}/api/posts/${postId}`
    );

    if (data === undefined || !data.success) {
      return {
        notFound: true,
      };
    } 
      return {
        props: {
          post: data.post,
          replies: data.replies,
        },
      };
  } catch (error) {
    console.log("post client  ===> ", error);
    return {
      notFound: true,
    };
  }

  
};
