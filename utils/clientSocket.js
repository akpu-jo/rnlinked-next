import { io } from "socket.io-client";

const URL = "https://rnlinked.herokuapp.com";

const socket = io(URL)

// export const messageReceived = () => {
    
// }

export default socket