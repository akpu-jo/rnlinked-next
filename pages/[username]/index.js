import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import { ProfileHead } from "@/components/users/ProfileHead";
import Tabs from "@/components/users/Tabs";
import { UserPosts } from "@/components/users/UserPosts";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import React, { useEffect, useState } from "react";

const Profile = ({ u }) => {
  const user = JSON.parse(u);
  const [categories] = useState(["Posts", "Articles"])


  return (
    <div className="mx-3">
      <AltHeader />
      <ProfileHead user={user} />
      <Tabs cats={categories} >
        <UserPosts user={user} />
        <p>Articles</p>
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
