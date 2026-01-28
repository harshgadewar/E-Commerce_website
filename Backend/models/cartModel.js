import mongoose from "mongoose";

const cart = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
    quantity: Number,
  },
  quantity:{
    type:Number,
    required: true,
  }
});

export const cartModel = mongoose.model("cartModel", cart);
