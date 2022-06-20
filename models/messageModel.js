import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const messageSchema = new mongoose.Schema(
  {
      sender: { type: ObjectId, ref: "User" },
      content: { type: String, trim: true },
      chat: { type: ObjectId, ref: "Chat" },
      readBy: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

let Message;
try {
  Message = mongoose.model("Message");
} catch (error) {
  Message = mongoose.model("Message", messageSchema);
}

export default Message;
