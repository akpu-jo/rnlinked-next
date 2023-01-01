import React, { useState, useMemo } from "react";
import { PhotographIcon, ReplyIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import { Avatar, Modal } from "@nextui-org/react";
import { resizeImage } from "@/utils/functions";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "react-responsive";
import TextareaAutosize from "react-textarea-autosize";
import ReplyPostCard from "./ReplyPostCard";

const NewPostModal = ({ setVisible, bindings, isReply = false, post }) => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [value, setValue] = useState("");

  const [previewImg, setPreviewImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const isInvalid = value === "";
  const placeholder = isReply ? "Type your reply" : "Share you thoughts";

  const handleImage = async (e) => {
    let file = e.target.files[0];
    console.log(e.target);
    console.log(imgFile);
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
      setImage("");
      setPreviewImg("");
      setImgFile(null);
    } catch (err) {
      console.log(err);
      toast.error("Unable to remove image! Try again.");
    }
  };

  const createPost = async (image = []) => {
    console.log(image);

    let { data } = await axios.post(`/api/posts`, {
      image,
      body: value,
      userId: user._id,
      replyTo: isReply? post._id : undefined
    });

    console.log("Data===>", data);

    if (data.success) {
      setValue([]);
      setPreviewImg("");
      setImgFile(null);
      setImage("");
      router.push(`/${user.username}/p/${data.post._id}`);
      setVisible(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (imgFile !== null) {
        axios
          .post(`${process.env.NEXT_PUBLIC_NODE_API}/articles/upload-image`, {
            img: imgFile,
          })
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
      setErrorMsg("Error creating post, try again");
      console.log(error);
      toast.error("Post Upload Failed");
    }
  };

  return (
    <>
      <Modal fullScreen={isMobile} {...bindings} width='500px' >
        <Modal.Header autoMargin={false} className="">
          <div className="w-full flex justify-between items-center px-5 py-3 border-b">
            {!isReply && (
              <h2 className="font-medium text-gray-800 dark:text-white text-lg">
                New post
              </h2>
            )}
            <button
              type="button"
              className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              onClick={() => setVisible(false)}
            >
              <span className="sr-only">Close</span>
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" mx-3 mt-1 pt-3 ">
            {/* {isReply && <ReplyPostCard post={post} />} */}
            {errorMsg !== null && <p>{errorMsg}</p>}
            {isReply && (
              <p className=" flex items-center text-base text-slate-500 pb-2 tracking-normal">
                <ReplyIcon className=" w-5 h-5 mr-1" />
                <span>In reply to {post.userId.name}</span>
              </p>
            )}
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
            <form className="" onSubmit={handleSubmit}>
              <div className=" flex mb-3">
                {user && (
                  <div>
                    <Avatar squared src={user.image} />
                  </div>
                )}
                <TextareaAutosize
                  className=" w-full text-l font-medium text-slate-700 px-1 pl-2  bg-slate-70 "
                  maxRows={10}
                  minRows={5}
                  maxLength={350}
                  placeholder={placeholder}
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </div>

              <div className=" flex justify-between items-center mt-5">
                <label className="">
                  <input
                    className=" w-0 h-0 opacity-0"
                    type="file"
                    name="image"
                    accept="image/*"
                    value={image}
                    onChange={handleImage}
                  />
                  <span className=" p-1 rounded-xl bg-slate-100 inline-block">
                    <PhotographIcon className=" w-7 h-7 text-elm-600" />
                  </span>
                </label>
                <button
                  type="button"
                  disabled={isInvalid}
                  onClick={() => handleSubmit()}
                  className={`px-5 py-1 bg-elm-700 text-slate-50 font-semibold rounded-md text-base ${
                    isInvalid && "cursor-not-allowed opacity-50"
                  }`}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPostModal;
