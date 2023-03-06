import Chat from "@/models/chatModel";
import connectDb from "@/utils/db";
import { authenticate } from "@/utils/auth";
import Message from "@/models/messageModel";

export default async function handler(req, res) {
  // const { token } = req.headers;

  const sessionUser = await authenticate(req, res)

  const { method } = req; 

  const getOtherChatUsers = (chatUsers) => {
    if (chatUsers.length === 1) return chatUsers;

    return chatUsers.filter((user) => user.username !== sessionUser.username);
  };
  await connectDb();

  switch (method) {
    case "GET":
      try {
        const chats = await Chat.find({
          users: { $elemMatch: { $eq: sessionUser._id } },
        })
          .populate("users", "name username _id image")
          .populate({
            path: "latestMessage",
            select: "sender content _id",
            populate: { path: "sender", select: "username name" },
          })
          .sort({ updatedAt: "-1" });

        //Get chat name and images
        chats.map((chat) => {
          // console.log("ChatName====>", chat.chatName);

          const otherChatUsers = getOtherChatUsers(chat.users);
          if (chat.chatName === undefined) {
            const namesArray = otherChatUsers.map((user) => user.name);
            // const firstTwoUsers = [namesArray.at(0), namesArray.at(1)]
            // console.log("NamesArray ===>", firstTwoUsers);
            chat.chatName = namesArray.join(", ");
          }

          const imageArray = otherChatUsers.map((user) => user.image);

          // console.log("imagesArray ===> 1", otherChatUsers)
          chat.chatImages =
            otherChatUsers.length === 1
              ? imageArray
              : [imageArray.at(0), imageArray.at(1)];
        });

        //Get chat Image

        res.status(200).json({
          success: true,
          chats,
        });
      } catch (error) {
        console.log("don't still know why error++++>", error);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const users = JSON.parse(req.body.users);
        console.log("chat api===>???", sessionUser);
        if (users.length === 0) {
          console.log("users array is empty");
          return res.sendStatus(400);
        }

        users.push(sessionUser._id);
        console.log("users array ====>", users);

        let chatData = {
          users,
          isGroupChat: true,
        };

        const chat = await Chat.create(chatData);

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
