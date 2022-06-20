import AltHeader from "@/components/navs/AltHeader";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { data: session } = useSession();
  const { user } = session !== undefined && session;
  const router = useRouter()

  //   const [name, setName] = useState(session && session.user.name)
  //   const [username, setUsername] = useState(session && session.user.username)
  //   const [bio, setBio] = useState(session && session.user.name)

  const [values, setValues] = useState({
    name: "",
    username: "",
    bio: "",
  });
  const { username, name, bio } = values;

  const fillValues = () => {
    if (session) {
    }
    setValues({
        ...values,
      name: session.user.name,
      username: session.user.username,
      bio: session.user.bio,
    });
  };

  const updateProfile = async () => {
    const { data } = await axios.patch(`/api/users/${session.user.id}`, {
      values,
    });

    console.log(data)
    router.replace(`/${data.user.username}`)
  };

  useEffect(() => {
    session && fillValues();
    console.log(session);
  }, [session]);

  return (
    <div>
      <AltHeader>
        <p className=" text-xl tracking-wide">Edit profile</p>
        <div className="w-1/3"></div>
        <button
          onClick={() => updateProfile()}
          className=" px-5 py-1 bg-burntSienna-50 rounded-full text-base"
        >
          Save
        </button>
      </AltHeader>

      <span className=" mx-4">
        <Avatar
        className=" mx-4"
          squared
          css={{ size: "$28" }}
          src={session && session.user.image}
        />
      </span>

      <form className=" mx-4">
        <div className="pb-5">
          <label className="block text-base text-gray-600 font-semibold tracking-wide py-1">
            Name
          </label>
          <input
            required
            aria-label="Enter the course name"
            type="text"
            name="name"
            className="px-3 py-3 w-full rounded-sm text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
            value={name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="pb-5">
          <label className="block text-base text-gray-600 font-semibold tracking-wide py-1">
            Username
          </label>
          <input
            required
            aria-label="Enter the course name"
            type="text"
            name="username"
            className="px-3 py-3 w-full rounded-sm text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
            value={username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
        </div>
        <div className="pb-5">
          <label className="block text-base text-gray-600 font-semibold tracking-wide py-1">
            Description
          </label>
          <textarea
            aria-label="Enter the video embed link from Youtube"
            name="description"
            // placeholder='Enter the video embed link from Youtube'
            className="px-3 py-3 w-full placeholder:text-sm rounded-sm text-base bg-gray-100 focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
            value={bio}
            onChange={(e) => setValues({ ...values, bio: e.target.value })}
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
