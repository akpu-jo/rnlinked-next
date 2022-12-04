import axios from "axios";
import React from "react";
import PostPageTemplate from "@/components/post/PostPageTemplate";
import SideNav from "@/components/navs/SideNav";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { useMediaQuery } from "react-responsive";

const PostPage = ({ post }) => {
  const {user} = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 640 });

  return (
    <div className=" bg-slate-50">
      <AppBar alt={isMobile} />
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
