import AltHeader from "@/components/navs/AltHeader";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import { Textarea } from "@nextui-org/react";
import { DotsVerticalIcon, PlusIcon } from "@heroicons/react/outline";

import TextareaAutosize from "react-textarea-autosize";
import AddPhotoIcon from "@/components/icons/AddPhotoIcon";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    // [{ size: [] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    // ["clean"],
  ],
};

const formats = [
  "header",
  "size",
  "bold",
  "italic",
  "underline",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

const Article = () => {
  const getContentFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("content")) {
      return JSON.parse(localStorage.getItem("content"));
    } else {
      return "";
    }
  };

  const getTitleFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("title")) {
      return JSON.parse(localStorage.getItem("title"));
    } else {
      return null;
    }
  };

  const [content, setContent] = useState(getContentFromLS());
  const [title, setTitle] = useState(getTitleFromLS());
  return (
    <div className=" mx-3">
      <AltHeader>
        <div className=" flex items-center ">
          <button className=" px-2 mx-1">
            <DotsVerticalIcon className=" w-5 h-5" />
          </button>
          <button className=" text-xl tracking-wide bg-cloud-600 px-2 py-1 rounded-md text-slate-200">
            Publish
          </button>
        </div>
      </AltHeader>
      <form>
        <TextareaAutosize
          className=" w-full text-3xl font-semibold text-slate-700 px-1 my-2"
          maxRows={4}
          maxLength={150}
          placeholder="Headline"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("title", JSON.stringify(e.target.value));
          }}
        />
        <div className="flex items-center justify-center border border-dashed py-2 bg-cloud-50 ">
          <label className="flex items-center justify-center cursor-pointer">
            <input
              className="h-0 w-0 opacity-0"
              type="file"
              // onChange={handleChange("photo")}
              accept="image/*"
            />
            <span
              title="Upload featured Image"
              className="text-xl font-bold cursor-pointer"
            >
              <AddPhotoIcon className=" w-7 h-7 text-gray-50" />
            </span>
              Add a cover photo
          </label>
        </div>
        <ReactQuill
          className=" flex-1"
          theme="bubble"
          modules={modules}
          formats={formats}
          placeholder="Start a post..."
          value={content}
          onChange={(e) => {
            console.log(e);
            setContent;
            localStorage.setItem("content", JSON.stringify(e));
          }}
        />
      </form>
    </div>
  );
};

export default Article;
