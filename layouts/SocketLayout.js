import { useAuth } from "@/contexts/AuthContext";
import socket from "@/utils/clientSocket";
import React, { useEffect } from "react";

const SocketLayout = ({ children }) => {
  const sessionUser = useAuth().user;

  const connectSocket = (user) => {
    let connected = false;

    socket.emit("setup", user);

    socket.on("connected", () => (connected = true));
  };


  useEffect(() => {
    sessionUser !== undefined &&
      sessionUser !== null &&
      connectSocket(sessionUser);
  }, [sessionUser]);

  return <>{children}</>;
};

export default SocketLayout;
