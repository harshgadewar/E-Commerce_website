import mongoose from "mongoose";


const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  productId: {
      type: mongoose.Schema.Types.ObjectId,
    ref: "productModel",
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },

  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});
