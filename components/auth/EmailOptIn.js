import { useAuth } from "@/contexts/AuthContext";
import { updateUser } from "@/utils/client/users";
import axios from "axios";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "firebaseConfig";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import RecButton from "../uiTemplates/buttons/RecButton";

const EmailOptIn = ({ loadVerifyEmail }) => {
  const { setUser, verifyEmail, addUserToSib } = useAuth();
  const router = useRouter();
  const [optedIn, setOptedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;

    const meta = {
      filter: { uid },
      reqBody: { inEmailList: optedIn, receivedEmailPrompt: true },
    };

    const {data} = await axios.patch('/api/users', meta)

    console.log(data.user);
    if (auth.currentUser.emailVerified) {

      await addUserToSib(meta.filter);
      setUser(data.user);
      router.push("/");
    } else {
      console.log(auth.currentUser.emailVerified);

      //update inEmailList & receivedEmailPrompt on mongodb
      //send verification email

      verifyEmail();

      loadVerifyEmail();
      //wait for user response
      //update emailVerified on Mongodb
      // add/rm from SIB depending on inEmailList
    }
  };

  return (
    <form method="POST" className=" mx-10" onSubmit={handleSubmit}>
      {optedIn && <div>yayyyyy, you are in</div>}
      <div className="flex justify-between">
        <div className="flex-1">
          <p className=" text-slate-700 font-medium tracking-normal pb-2">
            Receive email about your activity and recommendations
          </p>
          <small className=" text-slate-600 text-sm tracking-normal leading-loose">
            We may send you updates from your community such as engagements on
            your posts, articles, messages, useful recommendations and
            promotional contents from us and our partners.
          </small>
        </div>
        <label className=" checkbox bounce mt-4">
          <input
            type={"checkbox"}
            checked={optedIn}
            onChange={() => setOptedIn(!optedIn)}
          />
          <svg viewBox="0 0 21 21">
            <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
          </svg>
        </label>
      </div>

      <p className=" py-3 pt-12 tracking-normal font-medium">
        By signing up, you agree to our{" "}
        <Link
          target={"_blank"}
          className=" underline visited:text-burntSienna-500 text-burntSienna-300 "
          href={"/policy/tos"}
        >
          Terms
        </Link>
        ,{" "}
        <Link
          target={"_blank"}
          className=" underline visited:text-burntSienna-500 text-burntSienna-300 "
          href={"/policy/privacy"}
        >
          Privacy Policy
        </Link>
        , and{" "}
        <Link
          target={"_blank"}
          className=" underline visited:text-burntSienna-500 text-burntSienna-300 "
          href={"/policy/cookie"}
        >
          Cookie Policy
        </Link>{" "}
      </p>

      <RecButton
        text={"Sign Up"}
        bg={"bg-elm-900 font-semibold"}
        color={"text-slate-50"}
        type="submit"
      />
    </form>
  );
};

export default EmailOptIn;
