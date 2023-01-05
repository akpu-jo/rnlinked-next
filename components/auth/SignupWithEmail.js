import { useAuth } from "@/contexts/AuthContext";
import { ChevronLeftIcon, UserIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import Mail from "../icons/Mail";
import Password from "../icons/Password";
import RecButton from "../uiTemplates/buttons/RecButton";
import Input from "../uiTemplates/inputs/Input";

const SignupWithEmail = ({ showSigninOptions }) => {
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isInvalid = fullName === "" || password === "" || email === "";

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, fullName);
    } catch (err) {
      console.log(err);
    }
  };

  const icon = (jsx) => {
    return jsx;
  };
  return (
    <form method="POST" className=" mx-10" onSubmit={handleSignUp}>
      <Input
        icon={icon(<UserIcon className=" w-5 " />)}
        placeholder={"Full name"}
        type={"name"}
        value={fullName}
        onChange={({ target }) => setFullName(target.value)}
      />
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
        text={"Sign up"}
        bg={"bg-elm-900 font-semibold"}
        color={"text-slate-50 "}
        disabled={isInvalid}
        type="submit"
      />
      <button onClick={() => showSigninOptions()} className=" flex items-center justify-center w-full text-sm text-elm-700 tracking-wide my-10">
        <ChevronLeftIcon className=" w-4 h-4 mr-1" />
        All sign up options
      </button>
    </form>
  );
};

export default SignupWithEmail;
