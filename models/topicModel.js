import mongoose from "mongoose";
import validator from "validator";

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
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

let Topic;
try {
  Topic = mongoose.model("Topic");
} catch (error) {
  Topic = mongoose.model("Topic", TopicSchema);
}

export default Topic;



import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    
    
  },
  { timestamp: true }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
