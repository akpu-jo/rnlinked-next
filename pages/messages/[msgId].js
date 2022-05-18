import AltHeader from "@/components/navs/AltHeader";
import MobileNav from "@/components/navs/MobileNav";
import React from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:5000";
const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});

const Message = () => {
  console.log("socket===>", socket);
  return (
    <div>
      <AltHeader>
        <p className="">Chatxxs</p>
        <div className="w-1/3"></div>
      </AltHeader>
      Message
      <MobileNav />
    </div>
  );
};

export default Message;
