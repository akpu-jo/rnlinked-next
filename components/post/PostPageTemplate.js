import { useRouter } from "next/router";
import React from "react";

import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "./PostCard";
import EmptyStates from "../uiTemplates/EmptyStates";

const PostPageTemplate = ({ post, replies }) => {
  const { user } = useAuth();
  const router = useRouter();

  const message = () => {
    return <p className=" pb-2">This post has been deleted</p>;
  };

  return (
    <main className="col-span-6 sm:mt-5 mb-24 ">
      {post.replyTo !== undefined && (
        <div className="mx-3">
          {post.replyTo !== null ? (
            <PostCard post={post.replyTo} />
          ) : (
            <div className=" bg-slate-400 bg-opacity-10 mt-16 mb-2 -mx-3 shadow-sm ring-1 ring-slate-100 rounded-lg ">
                <EmptyStates message={message()} />
            </div>
          )}
        </div>
      )}
      <PostCard post={post} clipText={false} mainPost={true} />
      {replies.length > 0 && (
        <div className=" mx-3">
          {replies.map((reply, i) => (
            <PostCard key={i} post={reply} />
          ))}
        </div>
      )}
    </main>
  );
};

export default PostPageTemplate;
