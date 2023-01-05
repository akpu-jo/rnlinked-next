import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Mail from "../icons/Mail";
import Password from "../icons/Password";
import RecButton from "../uiTemplates/buttons/RecButton";
import Input from "../uiTemplates/inputs/Input";

const SigninWithEmail = ({ showSigninOptions }) => {
  const { signin, error } = useAuth();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const isInvalid = password === "" || email === "";

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("reached");
    try {
      await signin(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const icon = (jsx) => {
    return jsx;
  };
  return (
    <form method="POST" className=" mx-10" onSubmit={handleLogin}>
      {error && (
        <p className="mb-4 text-center text-xs text-red-500">{error}</p>
      )}
      <Input
        icon={icon(<Mail fill="currentColor" />)}
        placeholder={"Email"}
        type={"email"}
        value={email}
        onChange={({ target }) => setEmail(target.value.toLowerCase())}
      />
      <Input
        icon={icon(<Password fill="currentColor" />)}
        placeholder="Password"
        type={"password"}
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <RecButton
        text={"Sign in"}
        bg={"bg-elm-900 font-semibold"}
        color={"text-slate-50 "}
        disabled={isInvalid}
        type="submit"
      />
      <button className=" text-sm text-center w-full my-2 mt-8">
        Forgot password?{" "}
      </button>
      <button
        onClick={() => showSigninOptions()}
        className=" flex items-center justify-center w-full text-sm text-elm-700 tracking-wide my-"
      >
        <ChevronLeftIcon className=" w-4 h-4 mr-1" />
        All sign in options
      </button>
    </form>
  );
};

export default SigninWithEmail;
