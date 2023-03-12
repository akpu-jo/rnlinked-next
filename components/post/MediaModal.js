import { XIcon } from "@heroicons/react/outline";
import { Modal } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";

const MediaModal = ({ visible, setVisible, src }) => {
    const [showCloseBtn, setShowCloseBtn] = useState(true)
  const closeHandler = () => {
    setVisible(false);
  };
  return (
    <Modal noPadding open={visible} onClose={closeHandler} className="group" >
      { showCloseBtn && <Modal.Header
        css={{ position: "absolute", zIndex: "$1", top: 5, right: 8 }}
      >
        <button
            onClick={closeHandler}
          className="p-0.5 bg-slate-800 bg-opacity-60 text-slate-50 rounded-lg "
        >
          <XIcon className=" sm:w-5 sm:h-5 w-6 h-6 " />
        </button>
      </Modal.Header>}
      <Modal.Body onClick={() => setShowCloseBtn(!showCloseBtn)}>
        <Image
          className=" object-cover rounded-sm w- bg-gray-300 "
          src={src}
          alt=""
          width={10}
          height={10}
          layout="responsive"
          // showSkeleton
          
          quality={100}
        />
      </Modal.Body>
      {/* <Modal.Footer>Footer</Modal.Footer> */}
    </Modal>
  );
};

export default MediaModal;
