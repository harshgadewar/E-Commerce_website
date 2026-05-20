import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const sellerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
  },
  gst: {
    type: String,
  },
  shopName: {
    type: String,
  },
  pan: {
    type: String,
  },
});

export const sellerModel = mongoose.model("sellerModel", sellerSchema);
