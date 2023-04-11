import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    // userId: { type: ObjectId, ref: "User" },
    // postId: { type: ObjectId, ref: "Post" },
    // articleId: { type: ObjectId, ref: "Article" },
    // isArticle: {type: Boolean, default: false},
    // likes: [{ type: ObjectId, ref: "User" }],
    // replies: [{ type: ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

let Company;
try {
    Company = mongoose.model("Company");
} catch (error) {
    Company = mongoose.model("Company", companySchema);
}

export default Company;
