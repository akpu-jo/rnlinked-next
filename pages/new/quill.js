import AltHeader from "@/components/navs/AltHeader";
import { PhotographIcon, TrashIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';


const toolbarOptions = [["bold", "italic", "underline", "strike"]];

const QuillEditor = () => {
  const { data: session } = useSession();

  const [value, setValue] = useState('');
  const [previewImg, setPreviewImg] = useState("");
  const [quill, setQuill] = useState();

//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper === null) return;
//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q = new Quill(editor, {
//       theme: "bubble",
//       placeholder: "Start a post...",
//       modules: {
//         toolbar: toolbarOptions,
//       },
//     });
//     setQuill(q);

//     quill !== null && console.log(quill);
//   }, []);

  return (
    <div>
      <AltHeader>
        <p className=" text-xl tracking-wide">New Post</p>
        <div className=" w-1/3"></div>
      </AltHeader>
      <form className=" mx-3">
        {previewImg !== "" && (
          <div className="py-4 group relative">
            <>
              <Image
                className=" object-cover rounded-md w-screen bg-black "
                src={previewImg}
                alt=""
                width={350}
                height={200}
              />

              <button
                //   onClick={handleImageRemove}
                className="hidden group-hover:block absolute top-4 right-0 text-center rounded-sm p-2 bg-blue-50  text-red-600"
              >
                <TrashIcon className=" w-5 h-5 " />
              </button>
            </>
          </div>
        )}
        {/* {quill !== undefined && (
        //   <pre>{JSON.stringify(value, null, 4)}</pre>
        )} */}

        <div className=" flex ">
          {session && (
            <div>
              <Image
                className=" rounded-full"
                src={session.user.image}
                alt="Picture of the logo"
                width={50}
                height={50}
              />
            </div>
          )}
          {/* <div onChange={(e) => console.log('Change', e)} id="container" className=" flex-1" ref={wrapperRef} autoFocus>
            Demo content
          </div> */}
        </div>
      </form>
      <div className=" fixed bottom-0 left-0 right-0 mx-3 bg-white shadow-lg py-4">
        <div className=" flex justify-between items-center">
          <label className="">
            <input
              className=" w-0 h-0 opacity-0"
              type="file"
              name="image"
              accept="image/*"
              //   onChange={handleImage}
            />
            <span className=" p-2 rounded-full bg-slate-100 inline-block">
              <PhotographIcon className=" w-8 h-8 text-elm-600" />
            </span>
          </label>
          <button className="bg-gray-900 text-gray-100 rounded-3xl tracking-wide font-semibold text-xl text-center py-2 px-8">
            Post
          </button>
        </div>
      </div>
      <ReactQuill theme="bubble" value={value} onChange={(e) => setValue()} />
    </div>
  );
};

export default QuillEditor;
