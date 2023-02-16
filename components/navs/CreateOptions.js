import { NewspaperIcon, PencilAltIcon } from "@heroicons/react/outline";
import { Avatar, useModal } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import ArticleIcon from "../icons/ArticleIcon";
import NewPostModal from "../post/NewPostModal";
import NextUiModal from "../uiTemplates/NextUiModal";

const CreateOptions = ({ open, close }) => {
  const { setVisible, bindings } = useModal();

  if (!open) return null;

  return (
    <>
      <div
        onClick={close}
        className="fixed z-50 inset-0 bg-elephant-600 bg-opacity-60 "
      />
      <div className=" fixed bottom-0 rounded-t-lg left-0 right-0 py-6 shadow-xl z-5 bg-slate-100">
        <ul className=" text-slate-600 mx-5">
          <li className=" bg-primary-springWood bg-opacity-80 shadow-sm rounded-lg p-2 my-2 text-xl tracking-wide  focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
            <button
              type="button"
              onClick={() => setVisible(true)}
              className={`flex items-center space-x-4 hover:bg-elm-100 rounded-lg p-1 w-fit px-2`}
            >
              <Avatar
                squared
                size="lg"
                icon={<PencilAltIcon className=" w-7 h-7" />}
                className=" mr-2"
              />{" "}
              Short post
            </button>
          </li>
          {/* <Link href={`/new/post`}>
            <a className=" flex items-center ">
              <Avatar
                squared
                size="lg"
                icon={<PencilAltIcon className=" w-7 h-7" />}
                className=" mr-2"
              />
              Short post
            </a>
          </Link> */}

          <NewPostModal setVisible={setVisible} bindings={bindings} />
          <li className=" bg-primary-springWood bg-opacity-80 shadow-sm rounded-lg p-2 my-3 text-xl tracking-wide focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
            <Link
              href={`/new/article`}
              className=" flex items-center bg-slate-40"
            >
              <Avatar
                squared
                size="lg"
                icon={<NewspaperIcon className=" w-7 h-7" />}
                className=" mr-2"
              />
              Write article
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CreateOptions;
