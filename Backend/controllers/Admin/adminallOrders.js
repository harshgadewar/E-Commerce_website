import { orderModel } from "../../models/orderModel.js";

export const adminallOrders = async (req, res) => {
  try {
    const data = await orderModel
      .find({})
      .sort({ createdAt: -1 })
      .populate("userId", "name email")
      .populate("products.productId", "title price image");

    console.log(data);

    return res.status(200).json({
      message: "orders fetched!",
      data,
    });
  } catch (e) {
    console.log(e.message);

    return res.status(500).json({
      error: e.message,
    });
  }
};