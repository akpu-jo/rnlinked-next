import FollowLayout from "@/layouts/FollowLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import UserCard from "@/components/users/UserCard";
import { useAuth } from "@/contexts/AuthContext";

const Following = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [profileUser, setProfileUser] = useState({});

  const getUser = async () => {
    const { data } = await axios.get(`/api/${router.query.username}/following`);
    console.log("userrr===", data.user.following);
    setProfileUser(data.user);
  };

  const emptyListMsg =
    router.query.username === user.username
      ? "You are not following anyone yet"
      : `${
          profileUser.name && profileUser.name.split(" ")[0]
        } is not following by anyone yet`;

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {profileUser.name && profileUser.following.length < 1 ? (
        <p className=" text-slate-500 text-center my-10 ">{emptyListMsg}</p>
      ) : (
        <>
          {profileUser.name &&
            profileUser.following.map((followedUser) => (
              <UserCard key={followedUser._id} user={followedUser} />
            ))}
        </>
      )}
    </>
  );
};

export default Following;

Following.getLayout = function getLayout(page) {
  return <FollowLayout>{page}</FollowLayout>;
};
