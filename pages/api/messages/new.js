import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import { getChatByUserId } from "@/utils/messages";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;

  await connectDb();

  switch (method) {
    //GET REQUEST
    case "GET":
      try {
        res.status(200).json({
          success: true,
          message: "Nothing to get",
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
      //POST REQUEST
    case "POST":
      try {
        let chat;

        const users = JSON.parse(req.body.users);
        console.log("chat api===>", session.user);

        if (users.length === 0) {
          console.log("users array is empty");
          return res.status(400).json({success: false, message: 'users array is empty'});
        }
        
        if(users.length === 1){
          //Create Private Chat
          console.log('Private chat', users.toString())
          chat = await getChatByUserId(session.user, users[0])
        }else{
          //Create group chat
          users.push(session.user.id);
          chat = await Chat.create({users, isGroupChat: true});
        }
        
        
        
        // const otherChatUsers = JSON.parse(req.body.users);

        // const imageArray = otherChatUsers.map((user) => user.image);
        
        // console.log("image chat ====>", otherChatUsers);
        // const chatImages = imageArray;

        res.status(200).json({ success: true, chat });
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
