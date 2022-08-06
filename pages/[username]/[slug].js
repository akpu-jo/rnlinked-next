import AltHeader from "@/components/navs/AltHeader";
import {
  ChatIcon,
  ChevronLeftIcon,
  DotsVerticalIcon,
  PaperAirplaneIcon,
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
import { useSession } from "next-auth/react";
import Link from "next/link";
import ArticleComments from "@/components/articles/ArticleComments";

const ArticlePage = ({ article }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const { setVisible, bindings } = useModal();
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  const [liked, setLiked] = useState(
    article.likes.includes(session && session.user.id)
  );
  const [animateLike, setAnimateLike] = useState(false);
  const [postLikes, setPostLikes] = useState(article.likes);

  const handleLike = async (id) => {
    const { likes } = article;
    const { data } = await axios.post(`/api/articles/like`, {
      userId: session.user.id,
      articleId: id,
    });

    console.log(data);
    setPostLikes(data.likes);
    setAnimateLike(!data.isliked);
    setLiked(data.likes.includes(session.user.id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`/api/comments`, {
      body,
      userId: session.user.id,
      articleId: article._id,
      isArticle: true,
    });

    console.log(data);
    setComments((comments) => [...[data.comment], ...comments]);
    setBody("");
  };

  const loadComments = async () => {
    const { data } = await axios.get(`/api/comments?articleId=${article._id}`);
    console.log(data);
    setComments(data.comments);
  };

  useEffect(() => {
    setLiked(article.likes.includes(session && session.user.id));
  }, [session]);

  return (
    <div className=" ">
      <AltHeader>
        <div className=" flex items-center ">
          <button className=" px-2 mx-1">
            <DotsVerticalIcon className=" w-5 h-5" />
          </button>
        </div>
      </AltHeader>
      <main className=" max-w-6xl mx-3 mb-10">
        <h2 className="pt-2 pb-2 text-3xl text-slate-600 leading-normal tracking-wider font-medium font-serif">
          {article.title}
        </h2>

        {article.image.length > 0 && <figure className="block py-4">
          <Image
            className=" object-cover "
            src={article.image[0].url}
            alt=""
            layout="responsive"
            width={500}
            height={300}
          />
        </figure>}
        <article>
          <div className="max-w-2xl py-6 mx-auto text-gray-600 text-xl font-base leading-relaxed tracking-wide">
            {parse(article.body)}
          </div>
        </article>
        <div className=" py-2 bg-primary-springWood bg-opacity-90 rounded-lg">
          <h2 className=" -mb-2 mx-3 text-slate-600 font-medium text-xl tracking-wide">
            Author
          </h2>
          <UserCard user={article.author} showBio={true} />
        </div>
      </main>
      <footer className=" md:hidden sticky bottom-0 right-0 left-0  py-2 shadow-lg text-cloud-900 bg-primary-springWood flex justify-between items-center z-50">
        <ul
          className={` flex items-center mx-3  ${
            liked ? "text-red-500" : " text-slate-600"
          }`}
        >
          <li
            onClick={() => {
              setAnimateLike(true);
              handleLike(article._id);
            }}
            className={` flex items-center p-2 text-lg mr-2`}
            onAnimationEnd={() => setAnimateLike(false)}
          >
            <HeartInactiveIcon
              animateLike={animateLike}
              liked={liked}
              size="h-7 w-7"
            />
            <span
              className={`${postLikes.length && "ml-2"} ${animateLike && ""}`}
            >
              {postLikes.length || ""}
            </span>
          </li>

          <li
            onClick={() => {
              loadComments();
              setVisible(true);
            }}
            className=" flex items-center p-2  text-lg text-gray-500 "
          >
            <ChatIcon className=" w-7 h-7" />
            <p className="">{comments.length || ""}</p>
          </li>
        </ul>
        <Avatar
          zoomed
          className=" mr-3"
          squared
          size="md"
          src={session.user.image}
        />
      </footer>
      {session && (
        <Modal fullScreen {...bindings}>
          <Modal.Header className=" flex justify-between">
            <button
              className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
              onClick={() => setVisible(false)}
            >
              <XIcon className=" w-6 h-6" />
            </button>

            <h2 className=" text-xl text-slate-800 font-medium">
              Comments ({comments.length})
            </h2>
            <div className=" w-1/3" />
          </Modal.Header>
          <Modal.Body>
            {article.comments.length === 0 ? (
              <div className=" flex flex-col h-full items-center justify-center">
                <h2 className=" text-xl tracking-wide text-slate-700 font-medium text-center">
                  No comments yet
                </h2>
                <p className=" font-semibold text-gray-400 text-center">
                  Be the first to comment on this story
                </p>
              </div>
            ) : (
              <div>
                {comments.length > 0 &&
                  comments.map((comment, i) => (
                    <ArticleComments comment={comment} key={i} />
                  ))}
              </div> 
            )}
          </Modal.Body>
          <Modal.Footer
            justify="space-evenly"
            className=" -m-3 p-1 bg-slate-00"
          >
            <form
              onSubmit={handleSubmit}
              className=" w-full z-50 flex justify-between  items-end sticky bottom-0 right-0 left-0  py-3 border-t shadow-md bg-white "
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
              />

              <button className="mr-2 mb-1 " type="submit">
                <PaperAirplaneIcon className=" text-cloud-900 rounded-md w-8 h-8 rotate-90 items-center " />
              </button>
            </form>
          </Modal.Footer>
        </Modal>
      )}
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
