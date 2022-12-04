import React, { useState, useMemo } from "react";
import { ArrowNarrowLeftIcon, PhotographIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import AltHeader from "@/components/navs/AltHeader";
import { PostCard } from "@/components/post/PostCard";
import { useAuth } from "@/contexts/AuthContext";

const Comment = ({ post }) => {
  const {user} = useAuth()
  const router = useRouter();

 
  const [value, setValue] = useState('');

  const [previewImg, setPreviewImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);



  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      setPreviewImg(URL.createObjectURL(file));
      setImgFile(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const body = value

    if (imgFile) {
      //Resize

      Resizer.imageFileResizer(
        imgFile,
        720,
        500,
        "JPEG",
        100,
        0,
        async (uri) => {
          console.log("uri===> uri");

          try {
            let { data } = await axios.post(`/api/posts/comments`, {
              uri,
              body,
              userId: user.id,
              postId: post._id,
            });

            console.log("Data===>", data);
            setValue([]);
            setPreviewImg("");
            setImgFile(null);
            setImage({});
            router.back();

            //set img in the state
            // setImage(data);
          } catch (error) {
            console.log(error);
            toast.error("Post Upload Failed");
          }
        },
        "base64"
      );
    } else {
      try {
        let { data } = await axios.post(`/api/posts/comments`, {
          body,
          userId: user.id,
          postId: post._id,
        });

        console.log("Data===>", data);
        setValue([]);
        setPreviewImg("");
        setImgFile(null);
        setImage({});
        router.back();
      } catch (error) {
        console.log(error);
        toast.error("Post Upload Failed");
      }
    }
  };

  return (
    <div className=" relative">
      <AltHeader>
        <p className=" text-xl">Comment</p>
        <div className=" w-1/3"></div> 
      </AltHeader>
      <PostCard post={post} showAtions={false} />
      <div className=" pl-10  mx-3 pb-40">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-7">
            {user && (
              <div>
                <Image
                  className=" rounded-full"
                  src={user.image}
                  alt="Picture of the logo"
                  width={50}
                  height={50}
                />
              </div>
            )}

          </div>
          <div className="py-4 group relative">
            {previewImg && (
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
            )}
          </div>

          <div className=" fixed bottom-0 left-0 right-0 mx-3 bg-white shadow-lg py-4">
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

export default Comment;

export const getServerSideProps = async (context) => {
  const id = context.params.id

  const { data } = await axios.get(`https://rnlinked.vercel.app/api/posts/${id}`);

  return {
    props: {
      post: data.post,
    },
  };
};
