import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import UserOptions from "./UserOptions";
import { Avatar } from "@nextui-org/react";
import { useAuth } from "@/contexts/AuthContext";

const Header = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <header className=" sticky top-0 right-0 left-0 z-50 py-2 bg-slate-50 border-b">
      <nav className=" flex justify-between items-center max-w-6xl md:mx-auto mx-3 ">
        <ul className="flex items-center">
          <Link href="/" className="w-36 md:w-44  ">
            <Image
              src="/rn-logo.png"
              alt="Picture of the logo"
              width={125}
              height={28}
            />
          </Link>
        </ul>
        {/* {JSON.stringify(user.email)} */}
        <ul className="flex items-center z-20">
          {children}

          {user && (
            <li className="z-30 text-gray-500 hover:text-gray-600 text-base font-semibold tracking-wider">
              <Link href={`/${user.username}`}>
                <Avatar squared src={user.image} />
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
