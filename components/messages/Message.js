
import React, { useState, useRef }  from "react";
import { useAuth } from "@/contexts/AuthContext";

const Message = ({ message, getLiClassNames, isGroup }) => {
  const { user } = useAuth()
  const scroll = useRef(null);

  const [isMine] = useState(message.sender._id === user._id);

  const liClassName = isMine ? "mine" : "theirs";

  return (
    <li ref={scroll} className={` flex flex-col items-start  ${getLiClassNames}`}>
      {isGroup && getLiClassNames.includes("theirs first") && (
        <span className=" text-xs font-medium text-slate-500">
          {message.sender.name}
        </span>
      )}
      <div className=" whitespace-pre-line inline-flex flex-col body p-2 py-1 rounded-lg max-w-85 bg-slate-100 break-word">
        {message.content}
      </div>
    </li>
  );
};

export default Message;
