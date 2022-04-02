import mongoose from "mongoose";
import validator from "validator";
import { createUsername } from "../utils/createUsername.js";

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

        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            unique: true,
            validate: [validator.isEmail, "Please provide a valid email"],
        },
        profile: { type: String, required: false },
        bio: { type: String },

        role: {
            type: String,
            enum: ["user", "admin"],
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
        posts:[
            {
              type: ObjectId,
              ref: "Post",
            },
          ],
    },
    { timestamps: true }
);



userSchema.pre("save", async function (next) {
    //run if email is modified
    if (!this.isModified("email")) return next();

    //extract email username
    const emailUsername = this.email.split("@")[0].replace(".", "-");

    //check if username exists
    const userNameExists = await createUsername(emailUsername);

    //generate username
    if (!userNameExists) {
        this.username = emailUsername;
    } else {
        next();
    }

    next();
});


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