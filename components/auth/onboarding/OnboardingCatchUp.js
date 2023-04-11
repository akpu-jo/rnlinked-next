import { useAuth } from "@/contexts/AuthContext";
import { Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import EmailOptIn from "../EmailOptIn";
import VerifyEmail from "../VerifyEmail";

const OnboardingCatchUp = () => {
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const {
    openCatchUp,
    setOpenCatchUp,
    personalExpCatchUp,
    emailVerificationCatchUp,
  } = useAuth();

  const closeHandler = () => {
    setOpenCatchUp(false);
  };

  const heading = personalExpCatchUp
    ? "Sign up to recieve email notifications. "
    : emailVerificationCatchUp
    ? "Verify your Email."
    : "";

  return (
    <Modal
      preventClose
      closeButton
      open={openCatchUp}
      fullScreen={isMobile}
      onClose={closeHandler}
    >
      <Modal.Header>
        <h2 className=" text-xl text-slate-800 py-10 font-medium tracking-wide">
          {heading}
        </h2>
      </Modal.Header>
      <Modal.Body>
        {personalExpCatchUp && <EmailOptIn />}
        {emailVerificationCatchUp && <VerifyEmail />}
      </Modal.Body>
    </Modal>
  );
};

export default OnboardingCatchUp;
