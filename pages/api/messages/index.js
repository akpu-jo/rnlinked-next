import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
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
        const { chatId } = req.query;
        console.log("Chat Id ===>", chatId);

        const messages = await Message.find({ chat: chatId }).populate(
          "sender",
          "name username image _id"
        );

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
          sender: session.user.id,
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
