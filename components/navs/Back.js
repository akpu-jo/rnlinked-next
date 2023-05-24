import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React from "react";

const Back = () => {
  const router = useRouter();
  return (
    <nav
      className=" hidden sm:block sticky top-0 z-4 mx-3 py-5"
      onClick={() => router.back()}
    >
      <ArrowNarrowLeftIcon className=" w-7 h-7 text-slate-700" />
    </nav>
  );
};

export default Back;
