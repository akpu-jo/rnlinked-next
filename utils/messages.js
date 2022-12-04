import Chat from "@/models/chatModel";
import mongoose from "mongoose";

export const getChatByUserId = async (sessionUser, otherUser) => {

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

 export const getOtherChatUsers = (chatUsers, sessionUser) => {
    //  console.log('chatUsers ==>', chatUsers)
    if (chatUsers.length === 1) return chatUsers;

    return chatUsers.filter((user) => user.username !== sessionUser.username);
  };
