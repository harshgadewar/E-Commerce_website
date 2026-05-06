import mongoose from "mongoose";

const orders = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
  },
  totalPrice: {
    type: Number,
  },
  // status: {
  //   type: String,
  // },
  paymentMethod: {
    type: String,
    enum: ["COD", "UPI"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default:"pending"
  },
  shippingAddress: {
    type: String,
  },
  createdAt: {
    type: Date,
    default:Date.now
  },

  quantity: {
    type: Number,
  },
});

export const orderModel = mongoose.model("orderModel", orders);
