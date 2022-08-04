import AltHeader from "@/components/navs/AltHeader";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import Resizer from "react-image-file-resizer";

import { Loading, Textarea } from "@nextui-org/react";
import {
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import TextareaAutosize from "react-textarea-autosize";
import AddPhotoIcon from "@/components/icons/AddPhotoIcon";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { resizeImage } from "@/utils/functions";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    // [{ size: [] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
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
  const { data: session } = useSession();
  const router = useRouter();

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
  const getImageFromLS = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("cover-image")) {
      return JSON.parse(localStorage.getItem("cover-image"));
    } else {
      return null;
    }
  };

  const [content, setContent] = useState(getContentFromLS());
  const [title, setTitle] = useState(getTitleFromLS());
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const bottomRef = useRef(null);

  // const resizeImage = (file) => {
  //   //Resize
  //   return new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       720,
  //       500,
  //       "JPEG",
  //       100,
  //       0,
  //       (uri) => {
  //         // console.log("uri===>", uri);
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });
  // };

  const uploadImage = async (e) => {
    setImageUploading(true);
    try {
      const img = await resizeImage(e.target.files[0]);
      console.log("Image Based64==>", img);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API}/api/n/articles/upload-image`,
        { img }
      );
      console.log("Uploaded image response===>", data);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
    setImageUploading(false);
  };

  const deleteImage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API}/api/n/articles/remove-image`,
        { publicId: image.publicId }
      );

      console.log("deleted image response===>", data);
      data.result === "ok" && setImage(null);
    } catch (err) {
      console.log(err);
      toast.error("Unable to remove image! Try again.");
    }
  };

  const publish = async () => {
    try {
      const { data } = await axios.post(`/api/articles`, {
        title,
        body: content,
        image,
        author: session.user.id,
      });

      console.log(data);
      setContent('')
      setTitle('')
      localStorage.setItem("title", '');
      setImage(null)
      router.push(`/${session.user.username}/${data.article.slug}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col h-screen">
      <AltHeader>
        <div className=" flex items-center ">
          <button className=" px-2 mx-1">
            <DotsVerticalIcon className=" w-5 h-5" />
          </button>
          <button
            onClick={publish}
            className=" text-xl tracking-wide bg-cloud-900 px-2 py-1 rounded-md text-slate-200"
          >
            Publish
          </button>
        </div>
      </AltHeader>
      <form className=" flex-1">
        <TextareaAutosize
          className=" w-full text-3xl font-semibold text-slate-700 px-1 my-2  "
          maxRows={4}
          maxLength={150}
          placeholder="Headline"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            localStorage.setItem("title", JSON.stringify(e.target.value));
          }}
        />

        {image !== null ? (
          <div className=" group relative ">
            <Image
              className=" object-cover rounded- w- "
              src={image.url}
              alt=""
              width={400}
              height={250}
            />

            <button
              onClick={(e) => deleteImage(e)}
              className="hidden group-hover:block absolute top-0 right-0 text-center rounded-sm p-2 bg-blue-50  text-red-600"
            >
              <TrashIcon className=" w-5 h-5 " />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center border border-dashed py-2 bg-cloud-50 mb-3 mx-3 ">
            {imageUploading ? (
              <div>
                <Loading type="points-opacity" />
              </div>
            ) : (
              <label className="flex items-center justify-center cursor-pointer">
                <input
                  className="h-0 w-0 opacity-0"
                  type="file"
                  onChange={uploadImage}
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
            )}
          </div>
        )}
        <ReactQuill
          className=""
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Start a post..."
          value={content}
          onChange={(e) => {
            localStorage.setItem("content", JSON.stringify(e));
            setContent(e);
            bottomRef.current?.scrollIntoView();
          }}
        />
        <div ref={bottomRef} />
      </form>
    </div>
  );
};

export default Article;
