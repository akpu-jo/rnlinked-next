import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ActiveLink = ({ href, linkText, replace }) => {
  const router = useRouter();

  const active = router.asPath === href;
  console.log('active', router.pathname)
  return (
    <Link
      href={href}
      replace={replace}
      className={` ${
        active
          ? "text-slate-700 border-confetti-600"
          : "text-slate-600 hover:text-slate-700 border-transparent"
      } font-semibold text-sm sm:text-base border-b-2 focus:outline-none focus:text-slate-800 whitespace-nowrap pb-2 mr-10`}
    >
      {linkText}
    </Link>
  );
};

export default ActiveLink;
