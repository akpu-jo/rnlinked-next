import { timeDifference } from "@/utils/timeStamp";
import { Avatar } from "@nextui-org/react";
import React from "react";

const ReplyPostCard = ({ post }) => {
  console.log(post);
  const timestamp = timeDifference(Date.now(), new Date(post.createdAt));

  return (
    <>
      <div className=" flex items-cente ">
        <Avatar src={post.userId.image} squared size="md" />
        <section className=" flex-1">
          <div className=" flex items-center -mb-4">
            <p className=" tracking-normal text-slate-500 capitalize">
              {post.userId.name}
              {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
            </p>
            <p className=" p-1 text-2xl text-start  text-gray-400">&middot;</p>
            <p className="text-slate-400 text-sm font-light">{timestamp}</p>
          </div>
          <p className="text-lg font- whitespace-pre-line leading-normal tracking-wide  pt-2 py-2 text-slate-800">
            {post.body}
            <span className=" break-all break-normal">{post.image.length && post.image[0].url}</span>
          </p>
        </section>
      </div>
    </>
  );
};

export default ReplyPostCard;
