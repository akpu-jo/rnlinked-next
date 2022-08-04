import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    userId: { type: ObjectId, ref: "User" },
    postId: { type: ObjectId, ref: "Post" },
    articleId: { type: ObjectId, ref: "Article" },
    isArticle: {type: Boolean, default: false},
    likes: [{ type: ObjectId, ref: "User" }],
    replies: [{ type: ObjectId, ref: "Comment" }],
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
