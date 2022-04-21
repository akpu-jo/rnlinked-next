import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    userId: { type: ObjectId, ref: "User" },
    postId: { type: ObjectId, ref: "Post" },
    likes: [{ type: ObjectId, ref: "User" }],
    image: {},
  },
  { timestamps: true }
);

let Comment;
try {
  Comment = mongoose.model("Comment");
} catch (error) {
  Comment = mongoose.model("Comment", commentSchema);
}

export default Comment;
