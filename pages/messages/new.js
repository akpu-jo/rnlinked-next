import Recommendations from "@/components/explore/Recommendations";
import CheckedIcon from "@/components/icons/CheckedIcon";
import NewChatUsers from "@/components/messages/NewChatUsers";
import SearchChat from "@/components/messages/SearchChat";
import AltHeader from "@/components/navs/AltHeader";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useRef } from "react";

const NewMessage = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const focusSearchRef = useRef();

  const handleSelectedUsers = (user) => {
    console.log(user);
    const userObj = [
      {
        id: user._id,
        username: user.username,
        name: user.name,
      },
    ];
    const allSelectedUsers = [...selectedUsers];

    if (!selectedUsers.some((u) => u._id == user._id)) {
      setSelectedUsers((selectedUsers) => [...selectedUsers, ...[user]]);
    } else {
      const currentUserIndex = selectedUsers.findIndex(
        (u) => u._id == user._id
      );
      allSelectedUsers.splice(currentUserIndex, 1);
      setSelectedUsers(allSelectedUsers);
    }

    focusSearchRef.current.focus();
  };

  const createChatHandle = async () => {
    const selectedUserRequiredData = [];
    selectedUsers.map((user) =>
      selectedUserRequiredData.push({
        _id: user._id,
        username: user.username,
        name: user.name,
        image: user.image,
      })
    );
    
    const { data } = await axios.post(`/api/messages/new`, {
      users: JSON.stringify(selectedUserRequiredData),
    });

    router.push(`/messages/${data.chat._id}`);
    
  };

  const chatRecommendations = () => {
    return (
      <div className=" ml-2">
        {recommendedUsers !== undefined &&
          recommendedUsers.map((user, i) => (
            <div key={i} className=" flex items-center justify-between mr-3">
              <NewChatUsers
                user={user}
                handleSelectedUsers={handleSelectedUsers}
                selectedUsers={selectedUsers}
                key={user._id}
              />
              <CheckedIcon
                user={user}
                selectedUsers={selectedUsers}
                handleSelectedUsers={handleSelectedUsers}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <AltHeader>
        <p className=" text-2xl tracking-wide">Inbox</p>
        <div className="w-1/3"></div>
        <button
          onClick={() => createChatHandle()}
          className=" px-5 py-1 bg-burntSienna-50 rounded-full text-base"
        >
          Next
        </button>
      </AltHeader>
      <div className=" mt-14" />
      <SearchChat
        focusSearchRef={focusSearchRef}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        setRecommendedUsers={setRecommendedUsers}
        focus={true}
        selectedUsers={selectedUsers}
        handleSelectedUsers={handleSelectedUsers}
      />
      {chatRecommendations()}
      {/* <pre>{JSON.stringify(selectedUsers, null, 4)}</pre> */}
      {/* <Recommendations recommendedUsers={recommendedUsers} /> */}
    </div>
  );
};

export default NewMessage;
