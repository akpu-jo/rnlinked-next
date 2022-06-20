import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import connectDb from "@/utils/db";
import { getChatByUserId, getOtherChatUsers } from "@/utils/messages";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  const { method } = req;

  await connectDb();

  switch (method) {
    case "GET":
      try {
        let chat;
        // const users = JSON.parse(req.body.users);
        // const userId = req
        const { chatId } = req.query;
        const isValidId = mongoose.isValidObjectId(chatId);

        if (!isValidId) {
          return res.json({
            success: false,
            message:
              "Chat does not exist or you do not have permission to view it",
          });
        }
        console.log("chat api===>", session.user);

        chat = await Chat.findOne({
          _id: chatId,
          users: { $elemMatch: { $eq: session.user.id } },
        }).populate("users", "name username _id image");

        if (chat === null) {
          //chek if chat id is really userId
          const userFound = await User.findById(chatId);

          if (userFound !== null) {
            //get chat using user id
            chat = await getChatByUserId(session.user, userFound);
          }
        }

        if (chat === null) {
          return res.json({
            success: false,
            message:
              "Chat does not exist or you do not have permission to view it",
          });
        }
        const otherChatUsers = getOtherChatUsers(chat.users, session.user);
        console.log("otherChatUsers====>", otherChatUsers);
        //Get Chatname
        if (chat.chatName === undefined) {
          const namesArray = otherChatUsers.map((user) => user.name);
          chat.chatName = namesArray.join(", ");
        }

        //Get Chat Images
        const imageArray = otherChatUsers.map((user) => user.image);
        chat.chatImages =
          otherChatUsers.length === 1
            ? imageArray
            : [imageArray.at(0), imageArray.at(1)];

        const remainingChatImages = imageArray.length > 2 ? imageArray.length - 2 : 0

        res.status(200).json({ success: true, chat,  remainingChatImages, otherChatUsers});
      } catch (error) {
        console.log("Like Err0r====>", error);
        res.status(400).json({ error });
      }
      break;
    case "POST":
      try {
        res.status(200).json({
          success: true,
          message: `Nothing to ${method}`,
        });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
