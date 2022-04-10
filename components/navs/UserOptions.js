import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Context } from "../../contexts/AppContext";
import { getAuth, signOut } from "@firebase/auth";
import app from "../../firebase";
import { destroyCookie, setCookie } from "nookies";
import { axiosPrivate } from "../../services/axios";

//Icons
import { AdminActiveIcon, AdminInactiveIcon, EditActiveIcon, EditInactiveIcon } from "../Icons";


export default function UserOptions() {
  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  const [role, setRole] = useState("user");
  //Temporary User === jakpu
  // const [user, setUser] = useState({username: 'jakpu', })

  const isAdmin = () => {
    axiosPrivate
      .post("/users/auth")
      .then((res) => {
        const { user } = res.data;
        setRole(user.role);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogout = () => {
    console.log("State and Dispatch", state);
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        destroyCookie(null, "token");
        // setCookie(null, "token", "", {});
        dispatch({
          type: "LOGOUT",
        });
        router.push("/signin");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    isAdmin();
  }, [user]);

  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div className=" flex items-center">
          <Menu.Button className="flex justify-center w-10 h-10 text-center items-center text-xl capitalize font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {user ? user.username.charAt(0) : ""}
          </Menu.Button>
          <span className="p-2 hidden md:block ">{user ? user.username : " "}</span>
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
            {role === "admin" && (
              <>
                <div className=" px-2 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/admin")}
                          className={`${
                            active
                              ? "text-gray-900 font-semibold bg-blue-300"
                              : "text-gray-600"
                          } group rounded-sm flex text-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <AdminActiveIcon
                              className="w-5 h-5 mr-2 "
                              aria-hidden="true"
                            />
                          ) : (
                            <AdminInactiveIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          )}
                         Admin Dashboard
                        </button>
                      )}
                    </Menu.Item>
                </div>
                <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => router.push("/courses/create")}
                          className={`${
                            active
                              ? "text-gray-900 font-semibold bg-blue-300"
                              : "text-gray-600"
                          } group rounded-sm flex text-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <EditActiveIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <EditInactiveIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          )}
                          Create Courses
                        </button>
                      )}
                    </Menu.Item>
                </div>
              </>
            )}
            <div className="px-1 py-1">
              <Menu.Item>
                <Link href="/signin">
                  <a
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 hover:font-semibold hover:text-base  flex rounded-md items-center w-full px-2 py-2 text-sm"
                  >
                    Sign Out
                  </a>
                </Link>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
