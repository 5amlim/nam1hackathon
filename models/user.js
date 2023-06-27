import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true,
    },
    email: String,
    avatar: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default { mongoose, User };