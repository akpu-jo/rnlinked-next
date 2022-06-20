import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import UserOptions from "./UserOptions";
import { Avatar } from "@nextui-org/react";

const Header = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className=" bg-white right-0 left-0 z-50 flex justify-between items-center  shadow-sm sm:mx-4 mx-2 py-2 ">
      <ul className="flex items-center">
        <Link href="/">
          <a className="w-36 md:w-44 my-2 ">
            <Image
              src="/rn-logo.png"
              alt="Picture of the logo"
              width={250}
              height={50}
            />
          </a>
        </Link>
      </ul>
      <ul className="flex items-center z-20">
        {children}

        {session && (
          <li className="z-30 text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
            <Link href={`/${session.user.username}`}>
              <a>
                <Avatar squared src={session.user.image} />
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
