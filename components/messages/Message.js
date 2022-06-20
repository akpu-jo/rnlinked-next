import { useSession } from "next-auth/react";
import { css, Button } from "@nextui-org/react";
import React from "react";
import { useState } from "react/cjs/react.development";

const Message = ({ message, getLiClassNames, isGroup }) => {
  const { data: session } = useSession();

  const [isMine] = useState(message.sender._id === session.user.id);

  const liClassName = isMine ? "mine" : "theirs";

  return (
    <li className={` flex flex-col items-start  ${getLiClassNames}`}>
      {isGroup && getLiClassNames.includes("theirs first") && (
        <span className=" text-xs font-medium text-slate-500">
          {message.sender.name}
        </span>
      )}
      <div className="inline-flex flex-col body p-2 py-1 rounded-lg max-w-55 bg-slate-200">
        {message.content}
      </div>
    </li>
  );
};

export default Message;
