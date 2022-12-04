import { ChevronLeftIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import CheckedIcon from "../icons/CheckedIcon";
import NewChatUsers from "./NewChatUsers";
import SearchChat from "./SearchChat";
import EmptyStates from "../uiTemplates/EmptyStates";
import { auth } from "firebaseConfig";

const NewChatModal = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const focusSearchRef = useRef();
  const scrollIntoViewref = useRef(null);

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
    scrollIntoViewref.current?.scrollIntoView({ behavior: "smooth" });
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

    const token = await auth.currentUser.getIdToken(true)
    const { data } = await axios({
      method: "post",
      url: `/api/messages/new`,
      data: {
        users: JSON.stringify(selectedUserRequiredData),
      },
      headers: {
        token,
      },
    });

    router.push(`/messages/${data.chat._id}`);
  };

  const chatRecommendations = () => {
    return (
      <div className=" ml-2">
        {recommendedUsers.length > 0 ? (
          recommendedUsers.map((user, i) => (
            <div key={i} className=" flex items-center justify-between mr-3">
              <NewChatUsers
                user={user}
                handleSelectedUsers={handleSelectedUsers}
                selectedUsers={selectedUsers}
                key={user._id}
                scrollIntoViewref={scrollIntoViewref}
              />
              <CheckedIcon
                user={user}
                selectedUsers={selectedUsers}
                handleSelectedUsers={handleSelectedUsers}
              />
            </div>
          ))
        ) : (
          <div className=" h-[calc(100vh-20rem)] bg-slate-30 mt-14 ">
            <EmptyStates
              illustration={"/message.svg"}
              heading={"Start a private or group chat"}
              message={
                "Find a user or select multiple users to start a conversation"
              }
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      id="hs-scroll-inside-body-modal"
      className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-5 overflow-x-hidden overflow-y-auto"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 ease-out transition-all max-w-lg w-full m-3 mx-auto h-[calc(100%-0rem)] sm:h-[calc(100%-2.5rem)] ">
        <div className="max-h-full -mt-7 sm:mt-0 h-full overflow-hidden flex flex-col bg-white border shadow-sm sm:rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="py-3 px-4 border-b dark:border-gray-700">
            <div className=" flex justify-between items-center">
              <button
                type="button"
                className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-scroll-inside-body-modal"
              >
                <span className="sr-only">Close</span>
                <XIcon className="w-6 h-6" />
              </button>
              <h3 className="font-bold text-gray-800 dark:text-white">
                New message
              </h3>
              <button
                type="button"
                onClick={() => createChatHandle()}
                data-hs-overlay="#hs-scroll-inside-body-modal"
                className="hs-dropdown-toggle  px-5 py-1 bg-elm-500 text-slate-50 font-semibold rounded-md text-base"
              >
                Next
              </button>
            </div>
            <SearchChat
              focusSearchRef={focusSearchRef}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              setRecommendedUsers={setRecommendedUsers}
              focus={true}
              selectedUsers={selectedUsers}
              handleSelectedUsers={handleSelectedUsers}
            />
          </div>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-4">{chatRecommendations()}</div>
          </div>
          {/* <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
            <button
              type="button"
              className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-overlay="#hs-scroll-inside-body-modal"
            >
              Close
            </button>
            <a
              className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
              href="#"
            >
              Save changes
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NewChatModal;
