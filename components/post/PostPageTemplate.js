import { Avatar, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import AltHeader from "../navs/AltHeader";
import parse from "html-react-parser";
import Image from "next/image";
import { timeDifference } from "@/utils/timeStamp";
import HeartInactiveIcon from "../icons/HeartInactiveIcon";
import { ChatIcon, PaperAirplaneIcon } from "@heroicons/react/outline";
import axios from "axios";
import { ReplyIcon } from "@heroicons/react/solid";
import ArticleComments from "../articles/ArticleComments";

const PostPageTemplate = ({ post, makeFocus=false }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [comments, setComments] = useState([]);
  const commentInputRef = useRef();
  const [body, setBody] = useState("");

  const [liked, setLiked] = useState(
    post.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);

  const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  const handleLike = async (id) => {
    const { likes } = post;
    const { data } = await axios.post(`/api/posts/like`, {
      userId: session.user.id,
      postId: id,
    });

    console.log(data);
    setPostLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(session.user.id));
  };

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
    setLiked(post.likes.includes(session && session.user.id));
  }, [session]);

  useEffect(() => {
    loadComments();
    console.log(post._id);
  }, []);

  useEffect(() => {
      makeFocus && commentInputRef.current.focus()
  }, [makeFocus]);

  return (
    <div className=" flex flex-col h-screen  ">
      <main className=" flex-1">
        <section className=" flex mb-1 items-center mx-3 bg-opacity-90 rounded-lg ">
          <Link href={`/${post.userId.username}`}>
            <a>
              <Avatar zoomed squared size="md" src={post.userId.image} />
            </a>
          </Link>

          <Link href={`/${post.userId.username}`}>
            <a className=" px-3 ">
              <p className=" font-medium tracking-wide leading-5 text-md">
                {post.userId.name}
              </p>
              <p className=" font-semibold text-gray-400">
                @{post.userId.username}
              </p>
            </a>
          </Link>
        </section>
        <article className=" mx-3 bg-slate-00">
          {post.image.length > 0 && (
            <div className=" w-full">
              <Image
                className=" object-cover rounded-sm w-full bg-gray-300 "
                src={post.image[0].url}
                alt=""
                width={370}
                height={240}
                showSkeleton
                objectFit="cover"
              />
            </div>
          )}
          <p className=" py-2 text-slate-800 text-ellipsis overflow-hidden ">
            {parse(post.body)}
          </p>
          <ul
            className={` flex items-center justify-around border-b border-t ${
              liked ? "text-red-500" : " text-gray-500"
            }`}
          >
            <li
              onClick={() => {
                setAnimateLike(true);
                handleLike(post._id);
              }}
              className={` flex items-center p-2 text-lg mr-2`}
              onAnimationEnd={() => setAnimateLike(false)}
            >
              <HeartInactiveIcon animateLike={animateLike} liked={liked} />
              <span
                className={`${"ml-1"} ${
                  animateLike && ""
                } text-slate-500 tracking-wide`}
              >
                {postLikes.length} Liked
              </span>
            </li>
            <li
              // onClick={() => router.push(`/new/comment/${post._id}`)}
              className=" flex items-center p-2  text-lg text-gray-500  "
            >
              <ChatIcon className=" w-5 h-5 mr-1" />
              <p className=" tracking-wide">
                {post.comments.length || ""} Replies{" "}
              </p>
            </li>
            <li
              onClick={() => commentInputRef.current.focus()}
              className=" flex items-center p-2  text-lg text-gray-500  "
            >
              <ReplyIcon className=" w-5 h-5 mr-1 -rotate-180 " />
              <p className=" tracking-wide"> Reply </p>
            </li>
          </ul>

          { comments.length > 0 && <h2 className=" border-b text-slate-500 font-medium tracking-normal py-2 my-1">
            Comments
          </h2>}

          {comments.length > 0 &&
            comments.map((comment, i) => (
              <ArticleComments comment={comment} key={i} />
            ))}
        </article>
      </main>
      <footer className=" z-5 sticky bottom-0 right-0 left-0 z-50 ">
        <form
          onSubmit={handleSubmit}
          className=" flex justify-between  items-end py-3 border-t shadow-md bg-white "
        >
          <Textarea
            className=" ml- flex-1 text-gray-800 w-full  overflow-y-auto bg-gry-100 p-2 py-1 rounded-sm focus:outline-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            aria-label="Type you message"
            minRows={1}
            maxRows={4}
            size="xl"
            shadow={false}
            fullWidth={true}
            cacheMeasurements={false}
            placeholder="Share your thoughts..."
            ref={commentInputRef}
          />

          <button className="mr-2 " type="submit">
            <PaperAirplaneIcon className=" text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center " />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default PostPageTemplate;
