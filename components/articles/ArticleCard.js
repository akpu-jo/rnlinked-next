import Link from "next/link";
import React from "react";
import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Avatar } from "@nextui-org/react";
import { timeDifference } from "@/utils/timeStamp";
import { ChatIcon } from "@heroicons/react/outline";
import Image from "next/image";

const ArticleCard = ({ article, showAtions = true, clipText = true }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const timestamp = timeDifference(Date.now(), new Date(article.createdAt));

  return (
    <div className=" mx-4 py-3 border-b border-slate-100">
      <article className=" grid grid-cols-6 gap-2 bg-slate-60 py-1">
        <Link
          href={`/${article.author.username}/${article.slug}`}
          scroll={false}
        >
          <a className=" leading-6 tracking-normal font-semibold text-slate-900 font-serif col-span-4">
            {parse(article.title)}
          </a>
        </Link>
        {article.image && article.image.length > 0 && (
            <div className=" col-span-2 bg-slate-70 flex items-center">
              {/* <Avatar squared css={{size: '$24'}} src={article.image[0].url} /> */}
            <Image
              className=" object-cover rounded-sm w-full bg-gray-300 "
              src={article.image[0].url}
              alt=""
              width={300}
              height={200}
              showSkeleton
              objectFit="cover"
            />
          </div>
        )}
      </article>
      {session && showAtions && (
        <div className=" flex justify-between items-center z-10">
          <div className={` flex items-center `}>
            <Link href={`/${article.author.username}`}>
              <a className=" flex justify-start items-center z-10">
                <Avatar src={article.author.image} squared size="sm" zoomed />
                <div className=" ml-2">
                  <p className=" tracking-normal text-slate-800 text-sm capitalize">
                    {article.author.name}
                  </p>
                  {/* <p className=" font-semibold text-gray-400 text-sm">
                      @{post.userId.username}
                    </p> */}
                </div>
              </a>
            </Link>
            <p className=" p-1 text-2xl text-slate-700">&middot;</p>
            <p className="text-slate-700 text-sm font-light">{timestamp}</p>
          </div>
          <div className={` flex items-center  `}>
            <div
            //   onClick={() => {
            //     setMakeFocus(true);
            //   }}
            >
              <Link
                href={`/${article.author.username}/${article.slug}?makeFocus=true`}
                as={`/${article.author.username}/${article.slug}`}
                scroll={false}
              >
                <a className=" flex items-center p-2  text-lg text-gray-500 ">
                  <ChatIcon className=" w-5 h-5" />
                  <p className="">{article.comments.length || ""}</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleCard;
