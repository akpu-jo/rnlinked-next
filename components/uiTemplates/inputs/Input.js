import React, { useRef, useState } from "react";

const Input = ({ type, placeholder, icon, value, onChange }) => {
  const [isFocus, setIsFocus] = useState(false);
  const inputRef = useRef(null);
  return (
    <div
      className={`${
        isFocus && " ring-2"
      } rounded-sm flex items-center ring-1 hover:ring-2 ring-elm-100 my-1 mb-3 text-slate-700 text-lg `}
    >
      <span onClick={() => inputRef.current.focus()} className=" px-3 pr-4">
        {icon}
      </span>
      <input
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        type={type}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
        onChange={onChange}
        className=" w-full py-2"
      />
    </div>
  );
};

export default Input;
