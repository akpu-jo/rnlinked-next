import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = ({ children }) => {
  const router = useRouter();

  return (
    <nav className=" z-50 flex justify-between items-center  shadow-sm sm:mx-4 mx-2 ">
      <ul className="flex items-center">
        <Link href="/">
          <a className="w-36 md:w-44 my-2 ">
            <Image
              src="/logo.svg"
              alt="Picture of the logo"
              width={350}
              height={100}
            />
          </a>
        </Link>
      </ul>
      <ul className="flex items-center z-20">
        {children}

        {/* {user && <li className="z-30 text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
              <UserOptions />
            </li>} */}
      </ul>
    </nav>
  );
};

export default Header;
