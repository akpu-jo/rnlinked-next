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
import RecButton from "../uiTemplates/buttons/RecButton";

const NewPostModal = ({ setVisible, bindings, isReply = false, post }) => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [value, setValue] = useState("");

  const [previewImg, setPreviewImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const isInvalid = value === "";
  const placeholder = isReply ? "Type your reply" : "Share you thoughts";

  const handleFile = async (e) => {
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
      replyTo: isReply ? post._id : undefined,
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
      <Modal fullScreen={isMobile} {...bindings} width="500px" closeButton>
        <Modal.Header className="">
          {!isReply && (
            <h2 className="w-full text-start pb-2 ml-3 font-medium text-gray-800 dark:text-white text-lg">
              New post
            </h2>
          )}
        </Modal.Header>
        <Modal.Body className="mx-3">
          <form className="" onSubmit={handleSubmit}>
          {/* {isReply && <ReplyPostCard post={post} />} */}
          {errorMsg && <p>{errorMsg}</p>}
          {isReply && (
              <p className=" flex items-center text-base text-slate-500 pb-2 tracking-normal">
                <ReplyIcon className=" w-5 h-5 mr-1" />
                <span>In reply to {post.userId.name}</span>
              </p>
            )}
          {previewImg !== "" && (
              <div className="py-4 group ">
                <>
                  <Image
                    className=" object-cover rounded-md  "
                    src={previewImg}
                    alt=""
                    width={500}
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
          <div className=" flex mb-3">
              {user && (
                <div>
                  <Avatar squared src={user.image} />
                </div>
              )}
              <TextareaAutosize
                className=" w-full text-lg font-medium text-slate-700 px-1 pl-2  bg-slate-70 "
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

          <div className=" flex justify-between items-center my-5">
          <label className=" inline-flex w-12">
            <input
              className=" w-0 h-0 opacity-0"
              type="file"
              name="image"
              accept="image/*"
              value={image}
              onChange={handleFile}
            />
            <Avatar size={'md'} squared icon={<PhotographIcon className=" w-9 h-9 text-elm-600" />} />
            
          </label>
          <button
            type="button"
            disabled={isInvalid}
            onClick={() => handleSubmit()}
            className={`px-5 py-2 bg-elm-900 text-slate-50 font-semibold rounded-sm text-base ${
              isInvalid && "cursor-not-allowed opacity-50"
            }`}
          >
            Post
          </button>
          </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewPostModal;
