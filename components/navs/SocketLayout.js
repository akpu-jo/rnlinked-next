import socket from '@/utils/clientSocket';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

const SocketLayout = ({children}) => {
    const { data: session } = useSession();


    const connectSocket = (user) => { 
        let connected = false;
    
        socket.emit("setup", user);
    
        socket.on("connected", () => (connected = true));
        console.log("socket===>", socket);
      };

      useEffect(() => {
        session !== undefined && session !== null && connectSocket(session.user);
      }, [session]);

  return (
    <div>
        {children}
    </div>
  )
}

export default SocketLayout