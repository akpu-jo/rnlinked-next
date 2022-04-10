import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const NewPost = () => {
  const { data: session } = useSession();

  return (
    <div>
      <header>
        <ArrowNarrowLeftIcon className="w-5 h-5 " />
        <button>Post</button>
      </header>
      <div>
        <form>
          {session && (
            <Image
              className=" rounded-full"
              src={session.user.image}
              alt="Picture of the logo"
              width={50}
              height={50}
            />
          )}
          <textarea
            className=" text-gray-600 border-none focus:outline-none w-full"
            aria-label="Create a post"
            autoComplete="off"
            placeholder="Start a Post"
          />
        </form>
      </div>
      post
    </div>
  );
};

export default NewPost;
