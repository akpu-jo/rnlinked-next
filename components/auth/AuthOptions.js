import { useAuth } from "@/contexts/AuthContext";
import { Modal } from "@nextui-org/react";
import { google, twitter } from "firebaseConfig";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Mail from "../icons/Mail";
import RecButton from "../uiTemplates/buttons/RecButton";
import SigninWithEmail from "./SigninWithEmail";
import SignupWithEmail from "./SignupWithEmail";

const AuthOptions = ({
  bindings,
  isSignup = false,
  setIsSignup,
  onclose,
  setVisible,
}) => {
  const { withProvider, error, setError } = useAuth();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const [signinForm, setSigninForm] = useState(false);
  const [signupForm, setSignupForm] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const icon = (jsx) => {
    return jsx;
  };

  const showSignupWithEmail = () => {
    setShowOptions(false);
    isSignup ? setSignupForm(true) : setSigninForm(true);
  };

  const showSigninOptions = () => {
    signupForm ? setSignupForm(false) : setSigninForm(false);
    setShowOptions(true);
  };

  const signInWithProvider = async (provider) => {
    try {
      await withProvider(provider);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const options = () => {
    return (
      <>
        <div className=" flex flex-col mx-10">
          <RecButton
            action={() => signInWithProvider(google)}
            text={`Sign ${isSignup ? "up" : "in"} with Google`}
            icon={icon(
              <img alt="..." className="w-5 mr-3" src="/google.svg" />
            )}
          />
          <RecButton
            action={() => signInWithProvider(twitter)}
            text={`Sign ${isSignup ? "up" : "in"} with Twitter`}
            icon={icon(
              <img alt="..." className="w-5 mr-3" src="/twitter.svg" />
            )}
          />
          <RecButton
            action={showSignupWithEmail}
            text={`Sign ${isSignup ? "up" : "in"} with Email`}
            icon={icon(<Mail fill="currentColor" dec={"mr-4"} />)}
          />
        </div>
        <div className="text-center text-slate-700 tracking-wide py-5">
          <span>
            {" "}
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
          </span>
          <button
            onClick={() => setIsSignup(!isSignup)}
            className=" text-elm-900 font-semibold tracking-wide text-lg sm:text-base"
          >
            {" "}
            {isSignup ? "Sign in" : "Sign up"}
          </button>
        </div>
      </>
    );
  };
  return (
    <>
      <Modal
        fullScreen={isMobile}
        {...bindings}
        closeButton
        className=""
        onOpen={() => {
          showSigninOptions();
          setError(false);
        }}
        onClose={onclose}
      >
        <Modal.Header className=" mt-20 sm:mt-0">
          <h2 className=" text-xl text-slate-800 py-10 font-medium tracking-wide">
            {isSignup ? "Join RNlinked." : "Hello again."}
          </h2>
        </Modal.Header>
        <Modal.Body className=" text-slate-700 mb-8">
          {signinForm && (
            <SigninWithEmail showSigninOptions={showSigninOptions} />
          )}
          {signupForm && (
            <SignupWithEmail showSigninOptions={showSigninOptions} />
          )}
          {showOptions && options()}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthOptions;
