import mongoose from "mongoose";

const orders = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
    quantity: Number,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
});

export const orderModel = mongoose.model("orderModel", orders);
