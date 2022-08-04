import mongoose from "mongoose";
import validator from "validator";

const { ObjectId } = mongoose.Schema;

const tagSchema = new mongoose.Schema(
  {
    
    name: {
        type: String,
        unique: true,
        required: [true, " Tag name is required"],
        trim: true,
      },
      slug: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        index: true,
        lowercase: true,
      },
    followers: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

let Tag;
try {
  Tag = mongoose.model("Tag");
} catch (error) {
  Tag = mongoose.model("Tag", tagSchema);
}

export default Tag;