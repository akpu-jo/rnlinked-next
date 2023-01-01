import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    body: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    userId: { type: ObjectId, ref: "User" },
    likes: [{ type: ObjectId, ref: "User" }],
    image: [{}],
    repostUsers: [{type: ObjectId, ref: "User" }],
    repostData: {type: ObjectId, ref: "Post" },
    replyTo: {type: ObjectId, ref: "Post" },
    isReply:Boolean,
    pinned:Boolean,
    comments: [{ type: ObjectId, ref: "Post" }],
    replies: [{ type: ObjectId, ref: "Post" }],
    views: Number,
  },
  { timestamps: true }
);

postSchema.add({
  replies: [{ type: ObjectId, ref: "Post" }],
})

let Post;
try {
  Post = mongoose.model("Post");
} catch (error) {
  Post = mongoose.model("Post", postSchema);
}

export default Post;
