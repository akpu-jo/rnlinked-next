import React from "react";
import { Avatar, Button, Modal, useModal } from "@nextui-org/react";
import { ChevronLeftIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";

export const UserOptionsModal = ({ setVisible, bindings }) => {
  const { user, signout } = useAuth();
  const router = useRouter()
  const isMobile = useMediaQuery({ maxWidth: 640 });


  const onclick = (link) =>{
    router.push(link)
    setVisible(false)
  }

  if (!user) return null;

  return (
    <>
      <Modal fullScreen={isMobile} {...bindings}>
        <Modal.Header className=" flex justify-start m-3 ">
          <button
            className=" text-slate-700 rounded-md p-2 mr-3 "
           
          >
            <ArrowNarrowLeftIcon className=" w-7 h-7"  onClick={() => setVisible(false)}/>
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
            <li onClick={() => onclick(`/account/profile`)} className=" border-b border-slate-200 py-3 mt-3 text-xl tracking-wide hover:font-medium hover:text-slate-800 ">
              <Link href={`/account/profile`}>Edit profile</Link>
            </li>
            <li className=" border-b border-slate-200 py-3 mt-5 text-xl tracking-wide hover:font-medium hover:text-slate-800">
              Help and Feedback
            </li>
            <li onClick={() => onclick('/policy/privacy')} className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
              <Link href={'/policy/privacy'}>Privacy policy</Link>
            </li>
            <li onClick={() =>onclick('/policy/tos')} className=" border-b border-slate-200 py-3 text-xl tracking-wide hover:font-medium hover:text-slate-800">
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
