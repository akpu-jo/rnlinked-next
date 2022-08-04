import { smartTrim } from "@/utils/smartTrim";
import mongoose from "mongoose";
import slugify from 'slugify'
import {nanoid} from 'nanoid'

const { ObjectId } = mongoose.Schema;

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, max: 160 },
    body: { type: String, required: true },
    featured: { type: Boolean, default: false },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String },
    mtitle: { type: String },
    mdesc: { type: String },
    author: { type: ObjectId, ref: "User" },
    likes: [{ type: ObjectId, ref: "User" }],
    image: [{}],
    comments: [{ type: ObjectId, ref: "Comment" }],
    tags: [{ type: ObjectId, ref: "Tag", required: false }],
    views: Number,
  },
  { timestamps: true }
);

articleSchema.pre("save", function (next) {
    if (!this.isNew) return next();

    const uniqueTitle = `${this.title} ${nanoid()}` 
    console.log(uniqueTitle)

    this.slug = slugify(uniqueTitle).toLowerCase();
    this.mtitle = `${this.title} | ${process.env.APP_NAME}`;
    this.mdesc = this.body.substring(0, 160).replace(/<\/?[^>]+(>|$)/g, "");
    this.excerpt = smartTrim(this.body, 320, ' ', '...')
  
    next();
  });
  
let Article;
try {
  Article = mongoose.model("Article");
} catch (error) {
  Article = mongoose.model("Article", articleSchema);
}

export default Article;
