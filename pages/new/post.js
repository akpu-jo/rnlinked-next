import React, { useState, useMemo } from "react";
import { createEditor, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { ArrowNarrowLeftIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/solid";
import AltHeader from "@/components/navs/AltHeader";

const NewPost = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const initialValue = [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ];
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const [previewImg, setPreviewImg] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(false);

  const serialize = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };

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
    const body = serialize(value);

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
          console.log("uri===>", uri); 

          try {
            let { data } = await axios.post(`/api/posts`, {
              uri,
              body,
              userId: session.user.id,
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
        let { data } = await axios.post(`/api/posts`, {
          body,
          userId: session.user.id,
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
    }
    // console.log("ImageUploaded===>", image)
    // let { data } = await axios.post(`/api/posts`, {
    //   image, body, userId: session.user.id
    // });
    // console.log(data)
  };

  return (
    <div className=" relative">
      <AltHeader>
        <p className=" text-2xl tracking-wide">New Post</p>
        <div className=" w-1/3"></div>
      </AltHeader>
      {/* <pre>{JSON.stringify(session, null, 4)}</pre> */}
      <div className=" mx-3 pb-40">
        <form className="" onSubmit={handleSubmit}>
          <div className="grid grid-cols-7">
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
            <Slate
              editor={editor}
              value={value}
              onChange={(value) => {
                setValue(value);

                // console.log(serialize(value), value);
              }}
            >
              <Editable
                className="text-gray-600 ml-4 text-2xl col-span-6"
                placeholder="Start a Post"
                autoFocus
              />
            </Slate>
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

export default NewPost;

{
  /* <textarea
              className=" text-gray-600 border-none focus:outline-none w-full ml-4 text-2xl"
              aria-label="Create a post"
              autoComplete="off"
              placeholder="Start a Post"
              contentEditable
              rows="10"
            /> */
}
