import mongoose from "mongoose";

const orders = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    products: [
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel",
    },
    quantity: {
      type: Number,
    },
  },
],
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: [ "arriving", "delivered", "cancelled"],
      default: "arriving",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "ONLINE"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    shippingAddress: {
      address: String,
      city: String,
      state: String,
      pincode: Number,
    },

    
    razorpay_order_id: {
      type: String,
    },

    razorpay_payment_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const orderModel = mongoose.model("orderModel", orders);




