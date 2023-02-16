import { io } from "socket.io-client";


const socket = io(process.env.NEXT_PUBLIC_NODE_API)

// export const messageReceived = () => {
    
// }

export default socket 