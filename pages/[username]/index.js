import SettingsIcon from "@/components/icons/SettingsIcon";
import Back from "@/components/navs/Back";
import MobileNav from "@/components/navs/MobileNav";
import SideNav from "@/components/navs/SideNav";
import  ProfileHead  from "@/components/users/ProfileHead";
import Tabs from "@/components/users/Tabs";
import { UserOptionsModal } from "@/components/users/UserOptionsModal";
import UserOptionsSlideOver from "@/components/users/UserOptionsSlideOver";
import { UserPosts } from "@/components/users/UserPosts";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import { Avatar, Button, Modal, useModal } from "@nextui-org/react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Profile = ({ u }) => {
  const { user } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const profileUser = JSON.parse(u);
  const [categories] = useState(["Notes", "Articles"]);
  const { setVisible, bindings } = useModal();

  const isSessionUser = user && profileUser._id === user._id;
  console.log(profileUser, 'from index')

  const settings = () => {
    return(
      <div data-hs-overlay="#hs-overlay-right" >
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
      </div>
    )
  }

  return (
    <div className="">
      {/* <AppBar extraclass={"fixed"} alt={isMobile} showUser={!isMobile}>
        <ul className=" sm:hidden flex items-center justify-between">
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
        </ul>
      </AppBar> */}
      <UserOptionsModal setVisible={setVisible} bindings={bindings} />
      <div className="max-w-6xl mx-auto sm:grid grid-cols-11 gap-5 pt-2">
        <SideNav  />
        <div className=" col-span-8 pb-20 mx-auto sm:mt-">
          <Back rightContent={settings()} />
          <ProfileHead
            profileUser={profileUser}
            isSessionUser={isSessionUser}
          />
          <Tabs cats={categories}>
            <UserPosts user={profileUser} />
          </Tabs>
        </div>
        <section className=" hidden lg:block sticky top-16  col-span-2 xl:col-span-2 bg-slate-40 mt-2 bg-hite rounded-xl p-5 max-h-96">
          
          {/* <TrendingPosts /> */}
        </section>
      </div>
        <UserOptionsSlideOver />
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

  return {
    props: {
      u: JSON.stringify(user),
    },
  };
};
