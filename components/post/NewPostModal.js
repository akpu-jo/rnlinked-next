import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import AltHeader from "@/components/navs/AltHeader";
import { Avatar, Modal } from "@nextui-org/react";
import { resizeImage } from "@/utils/functions";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "react-responsive";

const modules = {
  toolbar: [["bold", "italic", "underline", "strike"]],
};

const NewPostModal = ({ setVisible, bindings }) => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });

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

  const createPost = async (image = []) => {
    console.log(image);

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

  const handleSubmit = async () => {
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
    <>
      <Modal fullScreen={isMobile} {...bindings}>
        <Modal.Header className="">
          <div className="w-full flex justify-between items-center px-5 py-3 border-b">
            <button
              type="button"
              className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800"
              onClick={() => setVisible(false)}            >
              <span className="sr-only">Close</span>
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="font-medium text-gray-800 dark:text-white text-lg">
              New post
            </h2>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-5 py-1 bg-elm-500 text-slate-50 font-semibold rounded-md text-base"
            >
              Next
            </button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" mx-3 mt-1 pt-3 ">
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
              <div className=" flex ">
                {user && (
                  <div>
                    <Avatar squared src={user.image} />
                    {/* <Image
                  className=" rounded-full"
                  src={user.image}
                  alt="Picture of the logo"
                  width={50}
                  height={50}
                /> */}
                  </div>
                )}
                <ReactQuill
                  className=" flex-1 -mt-3"
                  theme="bubble"
                  modules={modules}
                  placeholder="Start a post..."
                  value={value}
                  onChange={setValue}
                />
              </div>

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
              </div>
            </form>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <button onClick={() => setVisible(false)}>close</button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default NewPostModal;
