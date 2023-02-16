import Link from "next/link";
import React from "react";

const MenuOptions = ({ icon, text, link = "#", active = false }) => {
  return (
    <Link
      href={link}
      className={` ${
        active && " bg-elm-200 hover:bg-elm-300 text-slate-800"
      } flex items-center space-x-4 hover:bg-elm-100 rounded-lg p-1 w-fit px-2`}
    >
      <span className="">{icon} </span>
      <p
        className={` hidden xl:block text- font- tracking-wide ${
          active && " font-semibold"
        } `}
      >
        {text}
      </p>
    </Link>
  );
};

export default MenuOptions;
