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
    <Modal
      fullScreen={isMobile}
      closeButton
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header className=" border-b ">
          <h2 className=" text-xl text-slate-700 tracking-wide py-1">Liked by</h2>
      </Modal.Header>
      <Modal.Body className=" my-3">
        {users.length && users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default PostEngagementModal;
