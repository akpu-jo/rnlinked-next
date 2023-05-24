import { XIcon } from "@heroicons/react/outline";
import { Modal } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import UserCard from "../users/UserCard";

const PostEngagementModal = ({
  engagementType,
  visible,
  setVisible,
  users,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal fullScreen={isMobile} open={visible} onClose={closeHandler}>
      <Modal.Header className=" border-b  ">
        <div className=" flex justify-between items-center py-1 w-full">
          <div className=" w-" />
          <h2 className=" font-head text-2xl text-slate-700 tracking-wide">
            Liked by
          </h2>
          <XIcon
            className=" w-7 h-7 m-3 text-slate-700 bg-slate-200 hover:bg-slate-300 rounded-md"
            onClick={closeHandler}
          />
        </div>
      </Modal.Header>
      <Modal.Body className=" my-5">
        {users.length &&
          users.map((user) => <UserCard key={user._id} user={user} />)}
      </Modal.Body>
    </Modal>
  );
};

export default PostEngagementModal;
