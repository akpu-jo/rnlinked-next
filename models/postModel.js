import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    featured: { type: Boolean, default: false },
    userId: { type: ObjectId, ref: "User" },
    likes: [{ type: ObjectId, ref: "User" }],
    image: [{}],
    comments: [{ type: ObjectId, ref: "Comment" }],
    views: Number,
  },
  { timestamps: true }
);

let Post;
try {
  Post = mongoose.model("Post");
} catch (error) {
  Post = mongoose.model("Post", postSchema);
}

export default Post;
