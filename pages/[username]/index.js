import SettingsIcon from "@/components/icons/SettingsIcon";
import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import NextUiModal from "@/components/uiTemplates/NextUiModal";
import { ProfileHead } from "@/components/users/ProfileHead";
import Tabs from "@/components/users/Tabs";
import { UserPosts } from "@/components/users/UserPosts";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import { ChevronLeftIcon, CogIcon } from "@heroicons/react/outline";
import { Avatar, Button, Modal, useModal } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Profile = ({ u }) => {
  const { data: session } = useSession();

  const user = JSON.parse(u);
  const [categories] = useState(["Posts", "Articles"]);
  const { setVisible, bindings } = useModal();

  const isSessionUser = session && user._id === session.user.id;

  return (
    <div className="mx-3">
      <AltHeader>
        {isSessionUser && (
          <>
            <Button
              onClick={() => setVisible(true)}
              auto
              color
              icon={<SettingsIcon />}
            />
          </>
        )}
      </AltHeader>
      {session && (
        <Modal fullScreen {...bindings}>
          <Modal.Header className=" flex justify-start">
            <button
              className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
              onClick={() => setVisible(false)}
            >
              <ChevronLeftIcon className=" w-5 h-5" />
            </button>
          </Modal.Header>
          <Modal.Body>
            <ul className=" text-slate-600">
              <li className=" flex py-2 items-center bg-primary-springWood bg-opacity-90 rounded-lg">
                <Avatar
                  zoomed
                  className=" ml-3"
                  squared
                  size="lg"
                  src={session.user.image}
                />
                <div className=" px-3">
                  <p className=" font-medium tracking-wide leading-5 text-lg">
                    {session.user.name}
                  </p>
                  <p className=" font-semibold text-gray-400">
                    @{session.user.username}
                  </p>
                </div>
              </li>
              <li className=" border-b border-slate-200 py-3 mt-3 text-xl tracking-wide hover:font-medium hover:text-slate-800 ">
                <Link href={`/account/profile`}>
                  <a>Edit profile</a>
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
                <span onClick={() => signOut()}>Log Out</span>
              </li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            {/* <button onClick={() => setVisible(false)}>close</button> */}
          </Modal.Footer>
        </Modal>
      )}
      <ProfileHead user={user} isSessionUser={isSessionUser} />
      <Tabs cats={categories}>
        <UserPosts user={user} />
      </Tabs>
      <MobileNav />
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (context) => {
  const username = context.params.username;

  await connectDb();

  const user = await User.findOne({ username });
  console.log(user);

  // const result =   await axios.get(``)

  return {
    props: {
      u: JSON.stringify(user),
    },
  };
};
