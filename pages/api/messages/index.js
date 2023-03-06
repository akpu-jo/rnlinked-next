import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import User from "@/models/userModel";
import { authenticate } from "@/utils/auth";
import connectDb from "@/utils/db";
import { getChatIdByUserId } from "@/utils/messages";
import mongoose from "mongoose";

export default async function handler(req, res) {
  // const { token } = req.headers;

  const sessionUser = await authenticate(req, res);

  const { method } = req;

  await connectDb();

  switch (method) {
    //GET REQUEST
    case "GET":
      try {
        let messages;

        const { chatId } = req.query;

        const isValidId = mongoose.isValidObjectId(chatId);

        if (!isValidId) {
          return res.json({
            success: false,
            message:
              "Chat does not exist or you do not have permission to view it",
          });
        }

        messages = await Message.find({ chat: chatId }).populate(
          "sender",
          "name username image _id"
        );
        if (messages.length === 0) {
          //chek if chat id is really userId
          const userFound = await User.findById(chatId);

          console.log("Chat Id /api/messages/index:44====>", userFound);
          if (userFound !== null) {
            const chatid = await getChatIdByUserId(sessionUser._id, chatId);
            console.log("chatalt /api/messages/index:47====>", chatid);
            messages = await Message.find({ chat: chatid }).populate(
              "sender",
              "name username image _id"
            );
          }
        }
        res.status(200).json({
          success: true,
          messages,
        });
      } catch (error) {
        console.log("get messages error ===>", error);
        res.status(400).json({ success: false });
      }
      break;
    //POST REQUEST
    case "POST":
      try {
        const { content, chatId } = req.body;
        if (!content || !chatId) {
          console.log("Invalid data passed into request", content);
          return res.status(400).json({
            success: false,
            message: "Invalid data passed into request",
          });
        }

        const message = await Message.create({
          sender: sessionUser._id,
          chat: chatId,
          content,
        });

        await message.populate("sender", "name username image _id");
        await message.populate({
          path: "chat",
          select: "users _id",
          populate: { path: "users", select: "_id username" },
        });

        await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });

        console.log("message===>", message);

        res.status(200).json({ success: true, message });
      } catch (error) {
        console.log("Message Err0r====>", error);
        res.status(400).json({ error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
