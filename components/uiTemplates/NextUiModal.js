import { Modal } from "@nextui-org/react";
import React from "react";

const NextUiModal = ({ mHeader, mBody, mFooter, children, mOptions }) => {
  return (
    <Modal
      scroll
      fullScreen
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      {...bindings}
    >
      <Modal.Header className=" flex justify-between p-3 mx-3 my-3">
        <button
          className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
          onClick={() => {
            router.back();
            setIsOpen(false);
            setMakeFocus(false);
          }}
        >
          <XIcon className=" w-6 h-6" />
        </button>

        <h2 className=" text-xl text-slate-800 font-medium">Post</h2>
        <div className=" w-1/3" />
      </Modal.Header>
      <Modal.Body>
        <PostPageTemplate post={post} makeFocus={makeFocus} />
      </Modal.Body>
    </Modal>
  );
};

export default NextUiModal;
