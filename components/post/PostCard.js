import {
  ChatIcon,
  DotsVerticalIcon,
  ReplyIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
// import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { timeDifference } from "@/utils/timeStamp";
import {
  Avatar,

  Image,
  useModal,
} from "@nextui-org/react";
import HeartInactiveIcon from "../icons/HeartInactiveIcon";
import { useAuth } from "@/contexts/AuthContext";
import NewPostModal from "./NewPostModal";
import SubMenu from "../uiTemplates/submenu/SubMenu";
import SubMenuItem from "../uiTemplates/submenu/SubMenuItem";
import ModalTemplate from "../uiTemplates/Modal";

export const PostCard = ({
  post,
  mainPost = false,
  showAtions = true,
  clipText = true,
  fullW = true,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const [liked, setLiked] = useState(post.likes.includes(user && user._id));
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);
  const { setVisible, bindings } = useModal();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  const isAuthor = user && post.userId._id === user._id;
  const isReply = post.replyTo !== undefined;

  const handleLike = async (id) => {
    const { likes } = post;
    const { data } = await axios.post(`/api/posts/like`, {
      userId: user._id,
      postId: id,
    });

    console.log(data);
    setPostLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(user._id));
  };

  const deletePost = async () => {
    console.log('postreplyto ===>', post.replyTo)
    const replyTo = isReply? `replyTo=${post.replyTo}` : ''
    axios
      .delete(`/api/posts/${post._id}?${replyTo}`)
      .then((res) => {
        post.image.map(async (img) => {
          await deleteCloudinaryImage(img.publicID);
        });
      })
      .catch((error) => console.log(error));
      mainPost? router.back() : router.reload()
      setDeleteModalOpen(false)
  };

  const header = () => {
    return <h2 className="text-xl tracking-wide font-medium ">Delete post?</h2>;
  };

  const mbody = () => {
    return (
      <p className=" text-slate-700 text-lg p-5 tracking-wide">
        This will permanently delete your post! You won&apos;t be able to recover
        this post once deleted.
      </p>
    );
  };

  const footer = () => {
    return (
      <>
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="px-5 py-1 bg-slate-50 text-slate-500 ring-1 ring-slate-200 font-semibold rounded-md text-base tracking-wide"
        >
          Cancel
        </button>
        <button
          onClick={() => deletePost()}
          className="px-5 py-1 bg-red-500 text-slate-50 font-semibold rounded-md text-base tracking-wide"
        >
          Delete
        </button>
      </>
    );
  };

  useEffect(() => {
    setLiked(post.likes.includes(user && user._id));
    console.log(post)
  }, [user]);

  const queryBuilder = () => {
    const currentQuery = router.query; //target
    const postQ = { ...currentQuery, postId: post._id };

    // console.log(postQ);
    return postQ;
  };

  return (
    <div className="py-2 border-b border-slate-100 bg-white rounded-lg mb-1 ">
      <div className=" mx-2  bg-opacity-50 rounded-lg px-2 py-3">
        <section className="flex justify-between items-center ">
          <div className=" flex mb-1 items-center  bg-opacity-90 rounded-lg">
            <Link href={`/${post.userId.username}`}>
              <a>
                <Avatar zoomed squared size="md"  src={post.userId.image} />
              </a>
            </Link>

            <Link href={`/${post.userId.username}`}>
              <a className=" px-3 ">
                <p className=" font-medium tracking-wide leading-5 text-md">
                  {post.userId.name}
                </p>
                <p className=" flex items-center font-semibold text-sm text-gray-400">
                  @{post.userId.username}
                  <p className=" px-1 text-2xl text-gray-400">&middot;</p>
                  <p className="text-slate-400 text-sm font-light">
                    {timestamp} ago
                  </p>
                </p>
              </a>
            </Link>
          </div>
          <div className=" relative flex items-center text-center px-2 mr-3 h-full ">
            <button className="" onClick={() => setMenuOpen(!menuOpen)}>
              <DotsVerticalIcon className=" w-5 h-5" />{" "}
            </button>

            <SubMenu show={menuOpen} onClickOutside={() => setMenuOpen(false)}>
              {isAuthor && (
                <SubMenuItem
                  item={"Delete post"}
                  action={() => setDeleteModalOpen(true)}
                />
              )}
            </SubMenu>
          </div>
        </section>
        <ModalTemplate
          visible={deleteModalOpen}
          setVisible={setDeleteModalOpen}
          header={header}
          body={mbody}
          footer={footer}
        />
        <article className="">
          {isReply && (
            <p className=" flex items-center text-sm text-slate-500 pb-1 tracking-normal">
              <ReplyIcon className=" w-5 h-5 mr-1" />
              <span>In reply to {post.replyTo.userId.name}</span>
            </p>
          )}
          {post.image.length > 0 && (
            <div className=" w-full ">
              <Image
                className=" object-cover rounded-sm w-full bg-gray-300 "
                src={post.image[0].url}
                alt=""
                width={300}
                height={200}
                layout="responsive"
                // showSkeleton
                objectFit="cover"
              />
            </div>
          )}

          <Link href={`/${post.userId.username}/p/${post._id}`} scroll={false}>
            <a
              className={`${clipText && "clip-txt"} ${
                fullW ? "" : "w-80"
              } ${mainPost && 'text-2xl'} text-lg font- whitespace-pre-line leading-normal tracking-wide overflow-hidden text-ellipsis pt-2 py-2 text-slate-800 `}
            >
              <p className="  w-full">{post.body}</p>
            </a>
          </Link>
        </article>
        {user && showAtions && (
          <ul
            className={` flex items-center justify-between ${
              liked ? "text-red-500" : " text-gray-500"
            }`}
          >
            <li
              onClick={() => {
                setAnimateLike(true);
                handleLike(post._id);
              }}
              className={` flex items-center p-2 text-lg mr-2 cursor-pointer`}
              onAnimationEnd={() => setAnimateLike(false)}
            >
              <HeartInactiveIcon animateLike={animateLike} liked={liked} />
              <span
                className={` ml-1 ${
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
                {post.replies !== undefined && post.replies.length || ""} Replies{" "}
              </p>
            </li>

            <li
              onClick={() => setVisible(true)}
              className=" flex items-center p-2  text-lg text-gray-500 cursor-pointer  "
            >
              <ReplyIcon className=" w-5 h-5 mr-1 -rotate-180 " />
              <p className=" tracking-wide"> Reply </p>
              <NewPostModal
                setVisible={setVisible}
                bindings={bindings}
                isReply={true}
                post={post}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
