import React from "react";

const RecButton = ({
  action = (f) => f,
  text,
  icon,
  disabled,
  bg,
  border,
  color,
  type
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={action}
      className={` flex items-center justify-center w-full text-lg sm:text-base ${
        bg ? `${bg} active:bg-opacity-90` : " bg-slate-50 active:bg-slate-100"
      } dark:bg-slate-200  ${
        color ? color : "text-slate-700"
      } tracking-wide px-4 py-2 ring-1 ${
        disabled && "cursor-not-allowed bg-opacity-50"
      } ring-slate-200 rounded-sm outline-none my-[calc(0.3rem)]  `}
    >
      {icon}
      {text}
    </button>
  );
};

export default RecButton;
