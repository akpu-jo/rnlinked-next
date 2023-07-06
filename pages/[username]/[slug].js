import AltHeader from "@/components/navs/AltHeader";
import {
  ChatIcon,
  ChevronLeftIcon,
  DotsVerticalIcon,
  PaperAirplaneIcon,
  ReplyIcon,
  XIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { Avatar, Modal, Textarea, useModal } from "@nextui-org/react";
import UserCard from "@/components/users/UserCard";
import HeartInactiveIcon from "@/components/icons/HeartInactiveIcon";
import { useRouter } from "next/router";
import Link from "next/link";
import ArticleComments from "@/components/articles/ArticleComments";
import SideNav from "@/components/navs/SideNav";
import ArticleCommentSlideOver from "@/components/articles/ArticleCommentSlideOver";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { useMediaQuery } from "react-responsive";
import Back from "@/components/navs/Back";

const ArticlePage = ({ article }) => {
  const router = useRouter();
  const {user} = useAuth()
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [liked, setLiked] = useState(
    article.likes.includes(user && user._id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(article.likes);

  const handleLike = async (id) => {
    const { likes } = article;
    const { data } = await axios.post(`/api/articles/like`, {
      userId: user._id,
      articleId: id,
    });

    console.log(data);
    setPostLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(user._id));
  };

  useEffect(() => {
    setLiked(article.likes.includes(user && user._id));
  }, [user]);

  return (
    <div className=" ">
      {/* <AppBar extraclass={'fixed'} alt={isMobile} /> */}
      {/* <AltHeader>
        <div className=" flex items-center ">
          <button className=" px-2 mx-1">
            <DotsVerticalIcon className=" w-5 h-5" />
          </button>
        </div>
      </AltHeader> */}
      <main className=" max-w-6xl mx-auto mb-10 sm:grid grid-cols-11 gap-5 ">
        <SideNav />
        <article className=" col-span-6 mt- ">
          <Back topic={`Article by ${article.author.name}`} />
          <h2 className="pt-2 pb-2 text-3xl text-slate-600 leading-normal tracking-wider font-medium font-serif">
            {article.title}
          </h2>

          {article.image.length > 0 && (
            <figure className="block py-4">
              <Image
                className=" object-cover "
                src={article.image[0].url}
                alt=""
                layout="responsive"
                width={500}
                height={300}
              />
            </figure>
          )}
          <div className="max-w-2xl py-6 mx-auto px-3 sm:px-0 text-justify text-gray-600 text-lg font-light font-body leading-relaxed tracking-wide">
            {parse(article.body)}
          </div>
          <footer className="focus-within:hidden  sm:max-w-sm mx-auto lg:ring-1 ring-slate-400 lg:rounded-xl  sticky md:bottom-5 bottom-0 right-0 left-0  py-2 shadow-lg text-cloud-900 bg-slate-100 z-50">
            <ul
              className={` flex items-center justify-around mx-3 bg-slate-00   ${
                liked ? "text-red-500" : " text-slate-600"
              }`}
            >
              <li
                onClick={() => {
                  setAnimateLike(true);
                  handleLike(article._id);
                }}
                className={` flex items-center p-2 text-lg mr-2 cursor-pointer`}
                onAnimationEnd={() => setAnimateLike(false)}
              >
                <HeartInactiveIcon animateLike={animateLike} liked={liked} />
                <span className={` ml-2 ${animateLike && ""} tracking-wide`}>
                  {postLikes.length} Liked
                </span>
              </li>

              <li className=" flex items-center p-2  text-lg text-gray-500 ">
                <ChatIcon className=" w-6 h-6" />
                <p className=" ml-1 tracking-wide">{article.comments.length} Replies</p>
              </li>

              <li
                className=" flex items-center p-2  text-lg text-gray-500 cursor-pointer "
                data-hs-overlay="#hs-overlay-right"
              >

                <ReplyIcon className=" w-5 h-5 mr-1 -rotate-180 " />
                <p className=" tracking-wide"> Reply </p>
              </li>
            </ul>
          </footer>

        </article>
        
        <section className=" hidden lg:block sticky top-16  col-span-3 bg-slate-40 mt-2 bg-white rounded-xl p-1 max-h-96">
          <div className=" py-2 bg-primary-springWood bg-opacity-90 rounded-lg">
            <h2 className=" -mb-2 mx-3 text-slate-600 font-medium text-lg tracking-wide">
              Author
            </h2>
            <UserCard user={article.author} showBio={true} /> 
          </div>

        </section>
          <ArticleCommentSlideOver article={article} />
      </main>
    </div>
  );
};

export default ArticlePage;

export const getServerSideProps = async (context) => {
  console.log(" Context===>", context.params);
  const { slug } = context.params;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/articles/${slug}`
  );
  console.log("post  ===> ", data);

  return {
    props: {
      article: data.article,
    },
  };
};
