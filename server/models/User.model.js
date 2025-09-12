import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"], 
    default: "user", 
  },
   charts: [
    {
      type: String,
    },
  ],
  resetOtp: {
    type: String,
    default: "",
  },
  resetOtpExpireAt: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
