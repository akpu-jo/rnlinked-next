import { useAuth } from '@/contexts/AuthContext';
import socket from '@/utils/clientSocket';
import React, { useEffect } from 'react'

const SocketLayout = ({children}) => {
  const sessionUser = useAuth().user


    const connectSocket = (user) => { 
        let connected = false;
    
        socket.emit("setup", user);
    
        socket.on("connected", () => (connected = true));
        console.log("socket===>", socket);
      };

      useEffect(() => {
        sessionUser !== undefined && sessionUser !== null && connectSocket(sessionUser);
      }, [sessionUser]);

  return (
    <div>
        {children}
    </div>
  )
}

export default SocketLayout