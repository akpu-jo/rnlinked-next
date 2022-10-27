import { useAuth } from "@/contexts/AuthContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, google, twitter } from "firebaseConfig";
import React, { useState } from "react";

export const Signin = ({ open, openSignUp, onClose, openPassword }) => {
  const session = useAuth()
  const {signin} = session
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
  
      console.log(userCredential)
      
    } catch (error) {
      console.log(error)
    }
};

const signinWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, google) 
  console.log(auth, userCredential)
}

const signinWithTwitter = async () => {
 const userCredential = await signInWithPopup(auth, twitter)
  console.log(userCredential)
}

  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed z-20 inset-0 bg-elephant-50 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-80  "
      />
      <div className=" fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg z-30 bg-primary-springWood dark:bg-slate-800 rounded-lg w-4/5 sm:w-3/5 md:w-1/3">
        <div className="flex justify-end text-xl p-4 dark:text-slate-400 ">
          {" "}
          <button onClick={onClose}> X</button>
        </div>
        <div className="px-4 pb-8 sm:px-6 md:px-8 text-elephant-400 dark:text-elephant-100 ">
          <div className="text-center mb-3">
            <h6 className="text-sm font-bold">
              Sign in with
            </h6>
          </div>
          <div className="btn-wrapper text-center">
          <button
              onClick={signinWithGoogle}
              className="bg-white dark:bg-slate-200 active:bg-gray-100 text-elephant-600 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/google.svg" />
              Google
            </button>
            <button
              onClick={signinWithTwitter}
              className="bg-white dark:bg-slate-200 active:bg-gray-100 text-elephant-600 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs"
              type="button"
            >
              <img alt="..." className="w-5 mr-1" src="/twitter.svg" />
              Twitter
            </button>
         
          </div>
          <hr className="mt-6 border-b-1 border-gray-400" />
          <div className="text-center mb-3 font-bold">
            <small>Or sign in with credentials</small>
          </div>
          {error && (
            <p className="mb-4 text-center text-xs text-red-500">
              <small>{error}</small>
            </p>
          )}
          <form method="POST" onSubmit={handleLogin}>
            <div className="relative w-full mb-3">
              <label className="block uppercase  text-xs font-bold mb-2">
                Email
              </label>
              <input
                aria-label="Enter your email address"
                type="email"
                className="px-3 py-3 placeholder-elephant-200 text-elephant-400 dark:bg-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Email address"
                value={email}
                onChange={({ target }) => setEmail(target.value.toLowerCase())}
              />
            </div>

            <div className="relative w-full mb-3">
              <label className="block uppercase text-xs font-bold mb-2">
                Password
              </label>
              <input
                aria-label="Enter your password"
                type="password"
                className="px-3 py-3 placeholder-elephant-200 text-elephant-400 dark:bg-slate-300 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                placeholder="Password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <div className="text-center mt-6">
              <button
                disabled={isInvalid}
                className={`bg-elm-900 text-secondary-alto active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ${
                  isInvalid && "cursor-not-allowed opacity-50"
                }`}
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
          <div className="flex flex-wrap mt-6 dark:text-elephant-100 text-gray-800">
            <div className="w-1/2">
              <small className="">
                <button onClick={openPassword}>forgot Password </button>
              </small>
            </div>
            <div className="w-1/2 text-right">
              <small className="">
                <button onClick={openSignUp}>Create new account </button>
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
