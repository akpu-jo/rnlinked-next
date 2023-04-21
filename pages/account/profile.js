import AltHeader from "@/components/navs/AltHeader";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [values, setValues] = useState({
    name: "",
    username: "",
    bio: "",
  });
  const { username, name, bio } = values;

  const fillValues = () => {
    if (user) {
    }
    setValues({
      ...values,
      name: user.name,
      username: user.username,
      bio: user.bio,
    });
  };

  const updateProfile = async () => {
    const { data } = await axios.patch(`/api/users/${user._id}`, {
      values,
    });

    console.log(data);
    router.replace(`/${data.user.username}`);
  };

  useEffect(() => {
    user && fillValues();
    console.log(user);
  }, [user]);

  return (
    <div>
      <AppBar alt={isMobile} showUser={!isMobile}>
        <p className=" text-xl tracking-wide sm:hidden">Edit profile</p>
        <div className="w-1/3"></div>
        <button
          type="button"
          onClick={() => updateProfile()}
          className="px-5 py-1 mr-5 sm:hidden bg-elm-500 text-slate-50 font-semibold rounded-md text-base"
        >
          Save
        </button>

      </AppBar>

      <main className=" max-w-lg mx-auto">
        <span className=" mx-4">
          <Avatar
            className=" mx-4"
            squared
            css={{ size: "$28" }}
            src={user && user.image}
          />
        </span>

        <form className=" mx-4">
          <div className="pb-5">
            <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
              Name
            </label>
            <input
              required
              aria-label="Enter the course name"
              type="text"
              name="name"
              className="px-3 py-3 w-full rounded-md shadow-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
              value={name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="pb-5">
            <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
              Username
            </label>
            <input
              required
              aria-label="Enter the course name"
              type="text"
              name="username"
              className="px-3 py-3 w-full rounded-md shadow-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
              value={username}
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
            />
          </div>
          <div className="pb-5">
            <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
              Description
            </label>
            <textarea
              aria-label="Enter the video embed link from Youtube"
              name="description"
              rows={5}
              // placeholder='Enter the video embed link from Youtube'
              className="px-3 py-3 w-full placeholder:text-sm rounded-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
              value={bio}
              onChange={(e) => setValues({ ...values, bio: e.target.value })}
            />
          </div>
          <div className=" flex items-center justify-end">
            <button
              type="button"
              onClick={() => updateProfile()}
              className=" hidden sm:block justify-end px-10 py-2 bg-elm-500 text-slate-50 font-semibold rounded-md text-base tracking-wide"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Profile;
