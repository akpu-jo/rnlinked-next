import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NewspaperIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Avatar, useModal } from "@nextui-org/react";
import Link from "next/link";
import ArticleIcon from "../icons/ArticleIcon";
import NextUiModal from "../uiTemplates/NextUiModal";
import NewPostModal from "../post/NewPostModal";
import Overlay from "../uiTemplates/modals/Overlay";
import PlusIcon from "../icons/PlusIcon";

// const CreateOptions = ({ open, close }) => {

//   if (!open) return null;

//   return (
//     <>
//       <div
//         onClick={close}
//         className="fixed z-50 inset-0 bg-elephant-600 bg-opacity-60 "
//       />
//       <div className=" fixed bottom-0 rounded-t-lg left-0 right-0 py-6 shadow-xl z-5 bg-slate-100">

//       </div>
//     </>
//   );
// };

// export default CreateOptions;

const FloatingComposeBtn = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { setVisible, bindings } = useModal();

  const [showOverlay, setShowOverlay] = useState(false);

  const btnSize = isMobile ? "lg" : "xl";

  const createOptions = (open) => {
    if (!open) return null;

    return (
      <ul className=" text-slate-600 mb-4">
        <li className=" bg-primary-springWood bg-opacity-80 shadow-sm rounded-lg p-1 text-xl font-medium tracking-wide  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(true);
            }}
            className={`flex items-center justify-between hover:bg-elm-50 rounded-lg w-full`}
          >
            New note
            <Avatar
              squared
              size="lg"
              icon={<PencilAltIcon className=" w-7 h-7" />}
              className=" ml-"
            />{" "}
          </button>
        </li>

        <NewPostModal setVisible={setVisible} bindings={bindings} />
        <li className=" bg-primary-springWood bg-opacity-80 shadow-sm rounded-lg p-1 my-4 text-xl font-medium tracking-wide focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
          <Link
            href={`/new/article`}
            className=" flex items-center bg-slate-40 w-full hover:bg-elm-50"
          >
            New article
            <Avatar
              squared
              size="lg"
              icon={<NewspaperIcon className=" w-7 h-7" />}
              className=" ml-4"
            />
          </Link>
        </li>
      </ul>
    );
  };

  return (
    <>
      <Overlay isOpen={showOverlay} setIsOpen={setShowOverlay} />
      <div className="  fixed right-6 sm:right-16 2xl:right-44 bottom-16 z-5 ">
        <div
          onClick={() => {
            setShowOverlay(!showOverlay);
          }}
          className="add-post  text-cloud-50 mb-3 flex flex-col justify-end items-end   "
        >
          {createOptions(showOverlay)}
          <button className=" p-4 rounded-full bg-tradewind-200 bg-opacity text-tradewind-900">
            <PlusIcon />
          </button>
        </div>
      </div>
    </>
  );
};

export default FloatingComposeBtn;
