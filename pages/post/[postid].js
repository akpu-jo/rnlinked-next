import PostPageTemplate from "@/components/post/PostPageTemplate";
import { Modal, Text } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react";

const PostId = ({post}) => {


  return (
    <>
    <PostPageTemplate post={post} />
    </>
  );
};

export default PostId;

export const getServerSideProps = async (context) => {
  console.log(context.params);
  const postId = context.params.postid;

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