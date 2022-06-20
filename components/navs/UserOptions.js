import { useRouter } from "next/router";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

export default function UserOptions() {
  const { data: session } = useSession();

  const router = useRouter();

  // const [role, setRole] = useState("user");

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div className=" flex items-center">
          <Menu.Button className=" hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {session && (
                <Avatar
                  squared
                  src={session.user.image}
                />
                // {/* <Image
                //   className=" rounded-full"
                //   src={session.user.image}
                //   alt="Picture of the logo"
                //   width={50}
                //   height={50}
                // /> */}
            )}
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 py-2 w-64 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900 hover:font-semibold hover:text-base  flex rounded-md items-center w-full px-2 py-2 text-sm"
                >
                  Sign Out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
