import { PaperAirplaneIcon, XIcon } from "@heroicons/react/outline";
import { Textarea } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import EmptyStates from "../uiTemplates/EmptyStates";
import ArticleComments from "./ArticleComments";

const ArticleCommentSlideOver = ({ article }) => {
  const { data: session } = useSession();

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  const loadComments = async () => {
    const { data } = await axios.get(`/api/comments?articleId=${article._id}`);
    console.log(data);
    setComments(data.comments);
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

  useEffect(() => {
    loadComments();
  }, []);

  return (
    <div
      id="hs-overlay-right"
      className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 right-0 transition-all duration-300 transform h-full max-w-md w-full z-[60] bg-white border-l dark:bg-gray-800 dark:border-gray-700"
      tabindex="-1"
    >
      <div className=" fixed top-0 left-0 right-0 bg-white z-10 flex justify-between items-center flex-row-reverse sm:flex-row py-3 px-4 border-b dark:border-gray-700">
        <div className=" w-1/3  sm:hidden" />
        <h3 className="font-bold text-gray-800 dark:text-white">
          Comments({comments.length})
        </h3>
        <button
          type="button"
          className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
          data-hs-overlay="#hs-overlay-right"
        >
          <span className="sr-only">Close modal</span>
          <XIcon className=" h-7 w-7" />
        </button>
      </div>
      <div className="px-4 h-full overflow-y-auto pt-16">
        {comments.length > 0 ? (
          <div className=" h-full">
            {comments.map((comment, i) => (
              <ArticleComments comment={comment} key={i} />
            ))}
            <div className=" h-20" />
          </div>
        ) : (
          <div className=" h-[calc(100vh-20rem)]">
            <EmptyStates
              heading={"No comments yet"}
              message={"Be the first to comment on this story"}
            />
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className=" w-full z-50 flex  justify-between  items-end sticky bottom-0 right-0 left-0  py-3 border-t shadow-md bg-white "
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
    </div>
  );
};

export default ArticleCommentSlideOver;
