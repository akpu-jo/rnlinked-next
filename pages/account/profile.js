import AltHeader from "@/components/navs/AltHeader";
import Back from "@/components/navs/Back";
import SideNav from "@/components/navs/SideNav";
import ModalTemplate from "@/components/uiTemplates/Modal";
import RecButton from "@/components/uiTemplates/buttons/RecButton";
import { useAuth } from "@/contexts/AuthContext";
import AppBar from "@/layouts/AppBar";
import { Avatar, Popover } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [values, setValues] = useState({
    name: "",
    username: "",
    bio: "",
  });
  const { username, name, bio } = values;


  const fillValues = () => {
    if (user) {
    }
    setValues({
      ...values,
      name: user.name,
      username: user.username,
      bio: user.bio,
    });
  };

  const updateProfile = async () => {
    const { data } = await axios.patch(`/api/users/${user._id}`, {
      values,
    });

    console.log(data);
    router.replace(`/${data.user.username}`);
  };

  const header = () => {
    return (
      <h2 className="text-xl text-center tracking-wide font-medium ">
        We're sorry to see you go!!!
      </h2>
    );
  };
  
  const mbody = () => {
    return (
      <p className=" text-slate-700 text-lg p-5 tracking-wide">
        Are you sure you want to delete your account? By doing this, you will not
        be able to recover your data. 
      </p>
    );
  };
  
  const footer = () => {
    return (
      <>
        <button
          onClick={() => setShowDeleteConfirm(false)}
          className="px-5 py-1 bg-red-500 text-slate-50 font-semibold rounded-md text-base tracking-wide "
        >
          Cancel
        </button>
        <button
          // onClick={() => deletePost()}
          className=" px-5 py-1 bg-slate-50 text-slate-500 ring-1 ring-slate-200 font-semibold rounded-md text-base tracking-wide "
        >
          Delete
        </button>
      </>
    );
  };
  
  useEffect(() => {
    user && fillValues();
    console.log(user);
  }, [user]);

  const saveButton = () => {
    return (
      <button
        type="button"
        onClick={() => updateProfile()}
        className="px-5 py-1 mr-5 sm:hidden bg-elm-500 text-slate-50 font-semibold rounded-md text-base"
      >
        Save
      </button>
    );
  };
  return (
    <div>
      <div className=" max-w-6xl mx-auto sm:grid grid-cols-11 gap-5">
        <SideNav />
        <main className=" col-span-8 bg-slate-60 w-full max-w-xl mx-auto">
          <Back topic={"Edit profile"} rightContent={saveButton()} />
          <span className=" mx-4">
            <Avatar
              className=" mx-4"
              squared
              css={{ size: "$28" }}
              src={user && user.image}
            />
          </span>

          <form className=" mx-4">
            <div className="pb-5">
              <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
                Name
              </label>
              <input
                required
                aria-label="Enter the course name"
                type="text"
                name="name"
                className="px-3 py-3 w-full rounded-md shadow-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
                value={name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
            </div>
            <div className="pb-5">
              <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
                Username
              </label>
              <input
                required
                aria-label="Enter the course name"
                type="text"
                name="username"
                className="px-3 py-3 w-full rounded-md shadow-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
                value={username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </div>
            <div className="pb-5">
              <label className="block text-sm text-gray-600 font-semibold tracking-wide py-1">
                Description
              </label>
              <textarea
                aria-label="Enter the video embed link from Youtube"
                name="description"
                rows={5}
                // placeholder='Enter the video embed link from Youtube'
                className="px-3 py-3 w-full placeholder:text-sm rounded-sm text-base bg-white focus:bg-gray-50 focus:outline-none focus:ring-4 hover:bg-gray-50 hover:ring-4 ring-blue-100"
                value={bio}
                onChange={(e) => setValues({ ...values, bio: e.target.value })}
              />
            </div>
            <div className=" flex items-center justify-end">
              <button
                type="button"
                onClick={() => updateProfile()}
                className=" hidden sm:block justify-end px-10 py-2 bg-elm-500 text-slate-50 font-semibold rounded-md text-base tracking-wide"
              >
                Save
              </button>
            </div>
          </form>
          <Popover>
            <Popover.Content>
              <div>
                <h3>We're sorry to see you go!!</h3>
                <p>
                  Are you sure you want to delete your account? By doing this,
                  you will not be able to recover your data.
                </p>
              </div>
            </Popover.Content>
          </Popover>
          <div className=" my-10 mx-3">
            <RecButton
              action={() => setShowDeleteConfirm(true)}
              text={"Delete account"}
              color={"text-red-500"}
              type={"button"}
            />
            <ModalTemplate
              header={header}
              body={mbody}
              footer={footer}
              setVisible={setShowDeleteConfirm}
              closeHandler={() => setShowDeleteConfirm(false)}
              visible={showDeleteConfirm}
            />
          </div>
        </main>
      </div>
    </div>
  );
};


export default Profile;
