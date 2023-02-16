import React from "react";
import { Avatar, Button, Modal, useModal } from "@nextui-org/react";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export const UserOptionsModal = ({setVisible, bindings}) => {
    const { user, signout } = useAuth();

    if (!user) return null;

  return (
    <>
      <Modal fullScreen {...bindings}>
        <Modal.Header className=" flex justify-start m-3 ">
          <button
            className=" text-slate-500 rounded-md p-2 bg-slate-100 mr-3 "
            onClick={() => setVisible(false)}
          >
            <ChevronLeftIcon className=" w-5 h-5" />
          </button>
        </Modal.Header>
        <Modal.Body className=" m-3">
          <ul className=" text-slate-600 mx-2">
            <li className=" flex py-2 items-center bg-primary-springWood bg-opacity-90 rounded-lg">
              <Avatar
                zoomed
                className=" ml-3"
                squared
                size="lg"
                icon={
                  !user.image && (
                    <UserCircleIcon className=" w-10 h-10 opacity-50 " />
                  )
                }
                src={user.image}
              />
              <div className=" px-3">
                <p className=" font-medium tracking-wide leading-5 text-lg">
                  {user.name}
                </p>
                <p className=" font-semibold text-gray-400">@{user.username}</p>
              </div>
            </li>
            <li className=" border-b border-slate-200 py-3 mt-3 text-xl tracking-wide hover:font-medium hover:text-slate-800 ">
              <Link href={`/account/profile`}>
               Edit profile
              </Link>
            </li>
            <li className=" border-b border-slate-200 py-3 mt-5 text-xl tracking-wide hover:font-medium hover:text-slate-800">
              Help and Feedback
            </li>
            <li className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
              Privacy policy
            </li>
            <li className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
              Terms of service
            </li>
            <li className=" mt-10 py-3 text-secondary-burntSienna  text-xl tracking-wide font-semibold ">
              <span onClick={() => signout()}>Log Out</span>
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          {/* <button onClick={() => setVisible(false)}>close</button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};
