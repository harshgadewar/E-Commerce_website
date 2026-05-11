import mongoose from "mongoose";

const user = mongoose.Schema({
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
    enum: ["buyer", "admin", "seller"],
    default: "buyer",
  },
  isBlock: {
    type: Boolean,
    default: false,
  },
});

export const userModel = mongoose.model("userModel", user);
