import { orderModel } from "../models/orderModel.js";

export const myOrders = async (req, res) => {
  try {
    console.log("my orders hitting!!");
    let user = req.user._id;

    const data = await orderModel.find({ userId: user }).populate("productId");

    return res.status(200).json({ message: "featched user orders" ,data});
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message });
  }
};
