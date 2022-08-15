import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React, { Fragment, useState } from "react";
import AltHeader from "../navs/AltHeader";
import CommentForm from "./CommentForm";
import PostPageTemplate from "./PostPageTemplate";

const PostPageModal = ({ isOpen, closeModal, post, makeFocus }) => {
  const [comments, setComments] = useState([]);

  //   if (!open) return null;

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-5 " onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <div className=" min-h-screen ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" flex flex-col overflow-scroll w-full max-w-md h-screen transform bg-white  text-left align-middle transition-all">
                  <Dialog.Title
                    as="h3"
                    className=" bg-white z-5 text-lg leading-6  flex justify-between items-center p-3 border-b shadow-sm"
                  >
                    <button
                      className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 "
                      onClick={closeModal}
                    >
                      <XIcon className=" w-6 h-6" />
                    </button>
                    <h2 className=" text-lg text-slate-800 font-medium">
                      Post
                    </h2>
                    <div className=" w-1/3" />{" "}
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 overflow-scroll flex-">
                    <PostPageTemplate
                      post={post}
                      comments={comments}
                      setComments={setComments}
                    />
                  </Dialog.Description>
                  <footer className=" z-5 z-50 ">
                    <CommentForm
                      comments={comments}
                      setComments={setComments}
                      makeFocus={makeFocus}
                      postId={post._id}
                    />
                  </footer>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PostPageModal;
