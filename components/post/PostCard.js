import { ChatIcon, HeartIcon, XIcon } from "@heroicons/react/outline";
// import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import { timeDifference } from "@/utils/timeStamp";
import {
  Avatar,
  Button,
  Image,
  Modal,
  Text,
  useModal,
} from "@nextui-org/react";
import HeartInactiveIcon from "../icons/HeartInactiveIcon";
import parse from "html-react-parser";
import AltHeader from "../navs/AltHeader";
import PostPageTemplate from "./PostPageTemplate";
import PostPageModal from "./PostPageModal";

export const PostCard = ({
  post,
  showAtions = true,
  clipText = true,
  fullW = true,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [liked, setLiked] = useState(
    post.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);
  const { setVisible, bindings } = useModal();
  const [open, setOpen] = useState(false);
  let [isOpen, setIsOpen] = useState(false)

  const [makeFocus, setMakeFocus] = useState(false)

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

  useEffect(() => {
    setLiked(post.likes.includes(session && session.user.id));
  }, [session]);

  const queryBuilder = () => {
    const currentQuery = router.query; //target
    const postQ = { ...currentQuery, postId: post._id };

    // console.log(postQ);
    return postQ;
  };

  return (
    <div id={post._id} className="py-2 border-b border-slate-100 ">
      <div className=" mx-2  bg-opacity-50 rounded-lg px-2 py-3">
        <article className="">
          {post.image.length > 0 && (
            <div className=" w-full">
              <Image
                className=" object-cover rounded-sm w-full bg-gray-300 "
                src={post.image[0].url}
                alt=""
                width={300}
                height={200}
                showSkeleton
                objectFit="cover"
              />
            </div>
          )}

          <div onClick={() => setIsOpen(true)}>
            <Link
              href={{
                pathname: router.pathname,
                query: queryBuilder(),
              }}
              as={`/${post.userId.username}/p/${post._id}`}
              scroll={false}
            >
              <a
                className={`${clipText && "clip-txt"} ${
                  fullW && "w-80"
                } text-lg font- leading-normal tracking-wide overflow-hidden text-ellipsis pt-2 py-2 text-slate-800 `}
              >
                {parse(post.body)}
              </a>
            </Link>
          </div>
          <PostPageModal post={post} isOpen={isOpen} closeModal={()=> {
            router.back()
            setIsOpen(false)
            }} />
          <Modal
            scroll
            fullScreen
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
          >
            <Modal.Header className=" flex justify-between p-3 mx-3 my-3">
              <button
                className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
                onClick={() => {
                  router.back();
                  setVisible(false);
                  setMakeFocus(false)
                }}
              >
                <XIcon className=" w-6 h-6" />
              </button>

              <h2 className=" text-xl text-slate-800 font-medium">Post</h2>
              <div className=" w-1/3" />
            </Modal.Header>
            <Modal.Body>
              <PostPageTemplate post={post} makeFocus={makeFocus} />
            </Modal.Body>
          </Modal>
        </article>
        {session && showAtions && (
          <div className=" flex justify-between items-center z-10">
            <div className={` flex items-center `}>
              <Link href={`/${post.userId.username}`}>
                <a className=" flex justify-start items-center z-10">
                  <Avatar src={post.userId.image} squared size="sm" zoomed />
                  <div className=" ml-2">
                    <p className=" tracking-normal text-slate-500 capitalize">
                      {post.userId.name}
                    </p>
                    {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
                  </div>
                </a>
              </Link>
              <p className=" p-1 text-2xl text-gray-400">&middot;</p>
              <p className="text-slate-400 text-sm font-light">{timestamp}</p>
            </div>
            <div
              className={` flex items-center  ${
                liked ? "text-red-500" : " text-gray-500"
              }`}
            >
              <span
                onClick={() => {
                  setAnimateLike(true);
                  handleLike(post._id);
                }}
                className={` flex items-center p-2 text-lg mr-2`}
                onAnimationEnd={() => setAnimateLike(false)}
              >
                <HeartInactiveIcon animateLike={animateLike} liked={liked} />
                <span
                  className={`${postLikes.length && "ml-1"} ${
                    animateLike && ""
                  }`}
                >
                  {postLikes.length || ""}
                </span>
              </span>

              <div onClick={() => {
                setVisible(true)
                setMakeFocus(true)
                }}>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: queryBuilder(),
                  }}
                  as={`/${post.userId.username}/p/${post._id}`}
                  scroll={false}
                >
                  <a className=" flex items-center p-2  text-lg text-gray-500 ">
                    <ChatIcon className=" w-5 h-5" />
                    <p className="">{post.comments.length || ""}</p>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
