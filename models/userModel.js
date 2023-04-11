import mongoose from "mongoose";
import validator from "validator";

const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      lowercase: true,
      unique: true,
      maxlength: 32,
      index: true,
    },
    name: { type: String, trim: true, required: true },
    image: { type: String, trim: true, default: "" },
    uid: {type: String, unique: true},

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    profile: { type: String, required: false },
    bio: { type: String },

    role: {
      type: String,
      enum: ["user", "creator", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
      select: false,
    },
    avatar: {
      data: Buffer,
      contentType: String,
      // type: String,
      default: "",
    },
    posts: [
      {
        type: ObjectId,
        ref: "Post",
      },
    ],
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    signinMethod: String,
    emailVerified: Boolean,
    inEmailList: Boolean,
    receivedEmailPrompt: Boolean
  },
  { timestamps: true }
);

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ isActive: { $ne: false } });
  next();
});

let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}

export default User;