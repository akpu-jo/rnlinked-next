import React, { useState } from "react";
import { PasswordReset } from "../components/auth/password/PasswordReset";
import { Signin } from "../components/auth/Signin";
import { Signup } from "../components/auth/Signup";
import Header from "../components/navs/Header";

const welcome = () => {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // useEffect(() => {
  //     document.title = 'Welcome - RNlinked';
  // }, [])

  function openSignInDialog() {
    setSignInOpen(true);
    setSignUpOpen(false);
    setPasswordOpen(false);
  }

  function openSignUpDialog() {
    setSignUpOpen(true);
    setSignInOpen(false);
  }

  function openPasswordDialog() {
    setPasswordOpen(true);
    setSignInOpen(false);
  }
  return (
    <div className="w-full">
      <div className=" bg-elephant-50 dark:bg-slate-50 dark:bg-opacity-10 w-screen sm:w-96 h-96 absolute rounded-br-full "></div>
      <div className="absolute md:bottom-0 bottom-0 right-1 bg-opacity-60 dark:opacity-5">
        <svg
          viewBox="0 0 328 295"
          width="328"
          height="295"
          fill="none"
          className="asset-blob1 d3tapubf shape d3tapub"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M152.5 0C221-1.3 295.8 17.3 319.2 81.6c25.5 70-6.5 148.2-67.8 190.4-56.8 39-131 25.3-186.1-16C13 216.7-14 150.2 7.3 88.4 27.4 29 89.8 1.4 152.4.1z"
            fill="#f5e8ba"
          ></path>
        </svg>
      </div>
      <div className=" bg-primary-springWood h-full dark:bg-black ">
        <Header>
          <li>
            <button
              onClick={() => {
                setSignUpOpen(true);
              }}
              className=" hidden md:block w-32 hover:text-elm-900 dark:text-slate-200  text-sm font-semibold"
            >
              Sign Up
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setSignInOpen(true);
              }}
              className=" hover:text-elm-900  dark:text-slate-100 font-semibold"
            >
              Sign in
            </button>
          </li>
        </Header>

        <div className=" flex flex-col items-center h-screen">
          <main className=" z-10 my-auto mt-20 text-center sm:mt-44 md:mt-60  max-w-5xl ">
            <div className=" mx-2 sm:mx-auto sm:col-span-2 ">
              <h1 className=" sm:text-6xl md:text-7xl text-6xl text-slate-900 dark:text-burntSienna-600 font-head sm:pt-0 sm:pb-8 pt-4 tracking-wide ">
                We are a global community of nurses.
              </h1>
              <p className=" sm:text-xl md:text-2xl tracking-wide leading-8 text-lg text-slate-900 dark:text-slate-400 font-body pt-16 mb-10 ">
                We educate, inspire and connect nurses in different countries
                around the world.
              </p>
            </div>

            <button
              onClick={() => {
                setSignUpOpen(true);
              }}
              className=" sm:my-0 tracking-widest justify-center bg-elm-600 dark:bg-burntSienna-600 shadow-md px-3 py-2  rounded-full sm:w-56  w-4/6 text-sm uppercase font-head font-semibold text-elephant-50"
            >
              Get Started
            </button>
          </main>
        </div>
      </div>
      <Signin
        onClose={() => {
          setSignInOpen(false);
        }}
        openSignUp={openSignUpDialog}
        open={signInOpen}
        openPassword={openPasswordDialog}
      />
      <Signup
        onClose={() => {
          setSignUpOpen(false);
        }}
        openSignIn={openSignInDialog}
        open={signUpOpen}
      />
      <PasswordReset
        onClose={() => {
          setPasswordOpen(false);
        }}
        open={passwordOpen}
        openSignIn={openSignInDialog}
      />
    </div>
  );
};

export default welcome;
