import mongoose from "mongoose";

const product = mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

export const productModel = mongoose.model("productModel", product);
