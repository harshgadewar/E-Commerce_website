import { orderModel } from "../../models/orderModel.js";

export const myOrders = async (req, res) => {
  try {
    
    let user = req.user._id;
    console.log("user");
    const data = await orderModel.find({ userId: user }).populate("products.productId");


    return res.status(200).json({ message: "featched user orders", data });
  } catch (e) {
    console.log(e);
    console.log(e.response);
    console.log(e.response.data);
    console.error(e);
    console.error(e.message);
    console.log(e.response?.data);
    return res.status(500).json({ success: false, message: e.message });
  }
};
