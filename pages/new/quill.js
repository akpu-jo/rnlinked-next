import AltHeader from "@/components/navs/AltHeader";
import React, { useCallback, useEffect, useRef } from "react";

const toolbarOptions = [["bold", "italic", "underline", "strike"]];

const QuillEditor = () => {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, {
      theme: "bubble",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  return (
    <div>
      <AltHeader>
        <p className=" text-2xl tracking-wide">New Post</p>
        <div className=" w-1/3"></div>
      </AltHeader>
      <div id="container" ref={wrapperRef} autoFocus></div>
    </div>
  );
};

export default QuillEditor;
