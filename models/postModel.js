import mongoose from "mongoose";
import slugify from "slugify";

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
    {
    //   title: { type: String, required: true, trim: true, max: 160 },
      body: { type: {}, required: true },
      featured: {type: Boolean, default: false},
      mtitle: { type: String },
      mdesc: { type: String },
      userId: { type: ObjectId, ref: "User" },
      likes: [{ type: ObjectId, ref: "User" }],
      photo: {},
    //   tags: [{ type: ObjectId, ref: "Tag", required: true }],
      views: Number,
    },
    { timestamps: true }
  );
  
//   postSchema.pre("save", function (next) {
//     if (!this.isNew) return next();
  
//     this.slug = slugify(this.title).toLowerCase();
//     this.mtitle = `${this.title} | ${process.env.APP_NAME}`;
//     this.mdesc = this.body.substring(0, 160).replace(/<\/?[^>]+(>|$)/g, "");
//     this.excerpt = smartTrim(this.body, 320, ' ', '...')
  
//     next();
//   });
  
  const Post = mongoose.model("Post", postSchema);
  
  export default Post;