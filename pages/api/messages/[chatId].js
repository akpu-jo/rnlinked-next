import Chat from "@/models/chatModel";
import User from "@/models/userModel";
import { authenticate } from "@/utils/auth";
import connectDb from "@/utils/db";
import { getChatByUserId, getOtherChatUsers } from "@/utils/messages";
import mongoose from "mongoose";

export default async function handler(req, res) {
  const { method } = req;
  const sessionUser = await authenticate(req, res);

  await connectDb();

  // console.log("reaches here, shouldnot really", req);
  switch (method) {
    case "GET":
      try {
        if (sessionUser.tokenExpired) {
          return res.json(sessionUser);
        }
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
        // console.log("chat api===>", sessionUser);

        chat = await Chat.findOne({
          _id: chatId,
          users: { $elemMatch: { $eq: sessionUser._id } },
        }).populate("users", "name username _id image");

        if (chat === null) {
          //chek if chat id is really userId
          const userFound = await User.findById(chatId);

          if (userFound !== null) {
            //get chat using user id
            chat = await getChatByUserId(sessionUser, userFound);
          }
        }

        if (chat === null) {
          return res.json({
            success: false,
            message:
              "Chat does not exist or you do not have permission to view it",
          });
        }
        const otherChatUsers = getOtherChatUsers(chat.users, sessionUser);
        // console.log("otherChatUsers====>", otherChatUsers);
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

        const remainingChatImages =
          imageArray.length > 2 ? imageArray.length - 2 : 0;

        res
          .status(200)
          .json({
            success: true,
            chat,
            remainingChatImages,
            otherChatUsers,
            // tokenExpired: true,
          });
      } catch (error) {
        console.log("get chat Err0r====>", error);
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
