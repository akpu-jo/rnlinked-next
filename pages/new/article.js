import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");

// eslint-disable-next-line react/display-name
return ({ ref, ...props }) => <RQ ref={ref} {...props} />;

  },
  {
    ssr: false
  }
);

import "react-quill/dist/quill.snow.css";

import { Loading, Textarea } from "@nextui-org/react";
import {
  ChevronLeftIcon,
  DotsVerticalIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import TextareaAutosize from "react-textarea-autosize";
import AddPhotoIcon from "@/components/icons/AddPhotoIcon";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import { resizeImage } from "@/utils/functions";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Article = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [editorImageUrl, setEditorImageUrl] = useState([]);

  const getContentFromLS = () => {
    if (typeof window === "undefined") {
      return "";
    }

    if (localStorage.getItem("content")) {
      return JSON.parse(localStorage.getItem("content"));
    } else {
      return "";
    }
  };

  const getTitleFromLS = () => {
    if (typeof window === "undefined") {
      return "";
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

  const imageHandler = (a) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        const img = await resizeImage(file);

        const editor = editorRef.current.getEditor();
        const unprivilegedEditor =
          editorRef.current.makeUnprivilegedEditor(editor);
        const range = unprivilegedEditor.getSelection();

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_NODE_API}/api/n/articles/upload-image`,
          { img }
        );

        const url = data.image.url;

        editorRef.current.getEditor().insertEmbed(range.index, "image", url);

        editorRef.current.getEditor().setSelection(range.index + 1);

        setEditorImageUrl((editorImageUrl) => [
          ...editorImageUrl,
          ...[data.image],
        ]);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  const [content, setContent] = useState(getContentFromLS());
  const [title, setTitle] = useState(getTitleFromLS());
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const bottomRef = useRef(null);
  const editorRef = useRef(null);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          // [{ size: [] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

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


  const cloudinaryImageCleanUp = (content) => {
    editorImageUrl.map(async (img) => {
      if (!content.includes(img.url)) {
        deleteImage(img.publicId);
      }
    });
  };

  const uploadImage = async (e) => {
    setImageUploading(true);
    try {
      const img = await resizeImage(e.target.files[0]);
      console.log("Image Based64==>", img);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API}/articles/upload-image`,
        { img }
      );
      console.log("Uploaded image response===>", data);
      setImage(data.image);
    } catch (error) {
      console.log(error);
    }
    setImageUploading(false);
  };

  const deleteImage = async (publicId, e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_NODE_API}/articles/remove-image`,
        { publicId }
      );

      console.log("deleted image response===>", data);
      data.result === "ok" && setImage([]);
    } catch (err) {
      console.log(err);
      toast.error("Unable to remove image! Try again.");
    }
  };

  // const [h, setH] = useState(window.innerWidth)

  const publish = async () => {
    const reqBody =
      image === null
        ? { title, body: content, author: user._id }
        : { title, body: content, image, author: user._id };
    console.log(reqBody, "<==reqbody");

    try {
      cloudinaryImageCleanUp(reqBody.body);
      const { data } = await axios.post(`/api/articles`, reqBody);

      console.log(data);
      setContent("");
      setTitle("");
      localStorage.setItem("title", "");
      setImage(null);
      router.push(`/${user.username}/${data.article.slug}`);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  // setH(window.innerWidth)
  // }, [window])

  return (
    <div className=" flex flex-col h-screen  bg-blac">
      {/* {h}  */}
      <header className=" fixed top-0 right-0 left-0 z-5 py-2 bg-slate-100 ">
        <div className=" flex items-center justify-between max-w-5xl mx-auto px-3 ">
          <button
            className=" text-slate-500 rounded-md p-1 bg-slate-100 mr-3 sm:hidden "
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <ChevronLeftIcon className=" w-5 h-5" />
          </button>
          <Link href="/">
            <a className="w-36 md:w-44  hidden sm:block ">
              <Image
                src="/rn.svg"
                alt="rnlinked logo"
                width={125}
                height={28}
              />
            </a>
          </Link>
          <div className=" flex items-center justify-between">
            <button className=" flex items-center text-center px-2 mr-3">
              <DotsVerticalIcon className=" w-5 h-5" />{" "}
              <span className=" tracking-wide hidden sm:block ">options</span>
            </button>
            <button
              onClick={() => {
                publish();
              }}
              className=" text- tracking-wide bg-cloud-900 px-2 py-1 rounded-md text-slate-200"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      <form className=" flex-1 max-w-3xl w-full mx-auto mt-16">
        <div className=" mx-2 my-3">
          <TextareaAutosize
            className=" w-full text-3xl font-semibold text-slate-700 px-1 bg-slate-70   "
            maxRows={2}
            maxLength={150}
            placeholder="Headline"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              localStorage.setItem("title", JSON.stringify(e.target.value));
            }}
          />
        </div>

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
              onClick={(e) => deleteImage(image.publicId, e)}
              className="hidden group-hover:block absolute top-0 right-0 text-center rounded-sm p-2 bg-blue-50  text-red-600"
            >
              <TrashIcon className=" w-5 h-5 " />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center border border-dashed py-2 sm:py-4 bg-cloud-50 mb-3 mx-3 ">
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
          forwardedRef={editorRef}
          className=""
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Start a post..."
          value={content}
          onChange={(e) => {
            localStorage.setItem("content", JSON.stringify(e));
            setContent(e);
            // bottomRef.current?.scrollIntoView();
          }}
        />
        <div ref={bottomRef} />
      </form>
    </div>
  );
};

export default Article;


