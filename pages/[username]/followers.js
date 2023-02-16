import UserCard from "@/components/users/UserCard";
import FollowLayout from "@/layouts/FollowLayout";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Followers = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [profileUser, setProfileUser] = useState({});

  const getUserAndFollowers = async () => {
    const { data } = await axios.get(`/api/${router.query.username}/followers`);
    console.log("userrr===", data);
    setProfileUser(data.user);
  };

  const emptyListMsg =
    router.query.username === user.username
      ? "You don't have any followers yet"
      : `${
          profileUser.name && profileUser.name.split(" ")[0]
        } is not followed by anyone`;

  useEffect(() => {
    getUserAndFollowers();
  }, []);

  return (
    <>
      {profileUser.name && profileUser.followers.length < 1 ? (
        <p className=" text-slate-500 text-center my-10 ">{emptyListMsg}</p>
      ) : (
        <>
          {profileUser.name &&
            profileUser.followers.map((follower) => (
              <UserCard key={follower._id} user={follower} />
            ))}
        </>
      )}
    </>
  );
};

export default Followers;

Followers.getLayout = function getLayout(page) {
  return <FollowLayout>{page}</FollowLayout>;
};
