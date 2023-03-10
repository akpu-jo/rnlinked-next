import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { PostCard } from "./PostCard";
import EmptyStates from "../uiTemplates/EmptyStates";

const PostPageTemplate = ({ post, replies }) => {
  const { user } = useAuth();
  const router = useRouter();

  //TO IMPLEMENT THIS FEATURE LATER, 
  //=HIDE PARENT POST WHEN THE CURRENT POST IS A REPLY
  const currentPostRef = useRef(null);
  const [showParentPost, setShowParentPost] = useState(false);

  useEffect(() => {
    // currentPostRef.current.scrollIntoView()
    function handleScroll() {
      if (window.scrollY > currentPostHeight) {
        setShowParentPost(true);
        window.removeEventListener("scroll", handleScroll);
      }
    }

    const currentPostHeight = currentPostRef.current.offsetHeight;
    console.log("ffdfv", currentPostHeight);
    /* Calculate the height of the parent post */
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const message = () => {
    return <p className=" pb-2">This post has been deleted</p>;
  };

  return (
    <main className="col-span-6 sm:mt-5 mb-24 ">
      {post.replyTo !== undefined && (
        <>
          {
            <div className="mx-3 border-l-4">
              {post.replyTo !== null ? (
                <PostCard post={post.replyTo} />
              ) : (
                <div className=" bg-slate-400 bg-opacity-10 mt-16 mb-2 -mx-3 shadow-sm ring-1 ring-slate-100 rounded-lg ">
                  <EmptyStates message={message()} />
                </div>
              )}
            </div>
          }
          {/* <div className=" h-20" ref={bottonRef} /> */}
        </>
      )}
      <div ref={currentPostRef}>
        <PostCard post={post} clipText={false} mainPost={true} />
      </div>
      {replies.length > 0 && (
        <div className=" mx-3 border-l-4">
          {replies.map((reply, i) => (
            <PostCard key={i} post={reply} />
          ))}
        </div>
      )}
    </main>
  );
};

export default PostPageTemplate;
