import Chat from "@/models/chatModel";
import Message from "@/models/messageModel";
import mongoose from "mongoose";

export const getChatByUserId = async (sessionUser, otherUser) => {
  console.log('here /utils/messages:6')
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(sessionUser._id) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUser._id) } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [sessionUser._id, otherUser._id],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).populate("users", "name username _id image");
};

export const getChatIdByUserId = (sessionUserId, otherUserId) => {
  return Chat.findOneAndUpdate(
    {
      isGroupChat: false,
      users: {
        $size: 2,
        $all: [
          { $elemMatch: { $eq: mongoose.Types.ObjectId(sessionUserId) } },
          { $elemMatch: { $eq: mongoose.Types.ObjectId(otherUserId) } },
        ],
      },
    },
    {
      $setOnInsert: {
        users: [sessionUserId, otherUserId],
      },
    },
    {
      new: true,
      upsert: true,
    }
  ).select("_id");
};

export const getMessagesByChatId = (chatId) => {
  return Message.find({
    chat: chatId,
  }).populate("users", "name username _id image");
};

export const getOtherChatUsers = (chatUsers, sessionUser) => {
  //  console.log('chatUsers ==>', chatUsers)
  if (chatUsers.length === 1) return chatUsers;

  return chatUsers.filter((user) => user.username !== sessionUser.username);
};
