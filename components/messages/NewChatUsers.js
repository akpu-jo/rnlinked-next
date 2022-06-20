import Image from "next/image";
import React from "react";

const NewChatUsers = ({ user, handleSelectedUsers}) => {

  return (
    <div
      onClick={() => handleSelectedUsers(user)}
      className={` flex items-center justify-start py-2 my-3 mx-2 `}
    >
      {user !== undefined && (
        <Image
          className=" rounded-xl"
          src={user.image}
          alt="Picture of the logo"
          width={30}
          height={30}
        />
      )}
      <div className=" ml-3">
        <p className=" text-md text-slate-700 font-medium capitalize">
          {user.name}
        </p>
        <p className=" font-semibold text-gray-400 text-sm">@{user.username}</p>
      </div>
    </div>
  );
};

export default NewChatUsers;
