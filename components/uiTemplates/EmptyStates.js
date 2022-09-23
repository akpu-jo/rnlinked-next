import Image from "next/image";
import React from "react";

const EmptyStates = ({ heading, message, action, btnText, illustration, ...props }) => {
  return (
    <div className=" text-center items-center bg-slate-00 h-full flex flex-col justify-center -mt-14">
      { illustration && <Image
        src={illustration}
        alt={`${heading} illustration`}
        width={500}
        height={300}
      />}
      <h2 className=" text-2xl tracking-normal text-slate-700 p-2 ">
        {heading}
      </h2>
      <p className=" text-slate-500 text-">{message}</p>
      {btnText && (
        <button
        type="button"
          {...props}
          onClick={action}
          className=" bg-elm-600 p-2 rounded-lg my-3 font-semibold tracking-normal text-slate-50 text-lg px-4"
        >
          {" "}
          {btnText}
        </button>
      )}
    </div>
  );
};

export default EmptyStates;
