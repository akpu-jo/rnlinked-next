import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { PhotographIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import AltHeader from "@/components/navs/AltHeader";
import { Avatar } from "@nextui-org/react";
import { resizeImage } from "@/utils/functions";
import { useAuth } from "@/contexts/AuthContext";

const modules = {
  toolbar: [["bold", "italic", "underline", "strike"]],
};

const NewPost = () => {
  const {user} = useAuth()
  const router = useRouter();

  const [value, setValue] = useState("");

  const [previewImg, setPreviewImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  // const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImage = async (e) => {
    let file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      const img = await resizeImage(e.target.files[0]);
      console.log("Image Based64==>", img);

      setImgFile(img);
    } else {
      setPreviewImg("");
      setImgFile(null);
    }
  };

  const handleImageRemove = () => {
    try {
      setImage({});
      setPreviewImg("");
      setImgFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Unable to remove image! Try again.");
    }
  };

  const createPost = async (image=[]) => {
    console.log(image)
   
      let { data } = await axios.post(`/api/posts`, {
        image,
        body: value,
        userId: user._id,
      });

      console.log("Data===>", data);
  

    setValue([]);
    setPreviewImg("");
    setImgFile(null);
    // setImage({});
    router.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (imgFile !== null) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_NODE_API}/api/n/articles/upload-image`,
            { img: imgFile }
          )
          .then(async (response) => {
            console.log("IMG response===>", response);
            // setImage(response.data.image)
            createPost(response.data.image);
          });
      } else {
        createPost();
      }

      //set img in the state
      // setImage(data);
    } catch (error) {
      console.log(error);
      toast.error("Post Upload Failed");
    }
  };

  return (
    <div className=" relative">
      <AltHeader>
        <p className=" text-xl tracking-wide">New Post</p>
        <div className=" w-1/3"></div>
      </AltHeader>
      <div className=" max-w-md  mx-auto pb-40 mt-16">
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
                onClick={handleImageRemove}
                className="hidden group-hover:block absolute top-4 right-0 text-center rounded-sm p-2 bg-blue-50  text-red-600"
              >
                <TrashIcon className=" w-5 h-5 " />
              </button>
            </>
          </div>
        )}
        <form className=" max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className=" flex">
            {user && (
              <div>
                <Avatar squared src={user.image} />
              </div>
            )}
            <ReactQuill
              className=" flex-1"
              theme="bubble"
              modules={modules}
              placeholder="Start a post..."
              value={value}
              onChange={setValue}
              autoFocus
            />
          </div>

          <div className=" fixed bottom-0 left-0 right-0 bg-white shadow-lg py-4 max-w-md mx-auto">
            <div className=" flex justify-between items-center">
              <label className="">
                <input
                  className=" w-0 h-0 opacity-0"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
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
        </form>
      </div>
    </div>
  );
};

export default NewPost;
