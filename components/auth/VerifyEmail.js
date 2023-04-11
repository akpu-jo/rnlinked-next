import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import React, { useEffect } from "react";
import RecButton from "../uiTemplates/buttons/RecButton";

const VerifyEmail = () => {
  const { verifyEmail } = useAuth();

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="mx-10 text-center flex  flex-col items-center">
      <Image alt="email sent picture" src={"/mailSent.svg"} height={100} width={100} className=" my-5" />
      <p className=" text-slate-700 font-medium tracking-normal pb-2 my-10">
        Check your email and click the link to activate your account.
      </p>

      {/* TODO: set a timer for resending email */}
      {/* <RecButton
        text={"Resend Email"}
        bg={"bg-elm-900 font-semibold"}
        color={"text-slate-50"}
        action={verifyEmail}
      /> */}
    </div>
  );
};

export default VerifyEmail;
