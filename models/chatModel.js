import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const chatSchema = new mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: ObjectId, ref: "User" }],
    latestMessage: { type: ObjectId, ref: "Message" },
    chatImages: [String],
  },
  { timestamps: true }
);

let Chat;
try {
  Chat = mongoose.model("Chat");
} catch (error) {
  Chat = mongoose.model("Chat", chatSchema);
}

export default Chat;
