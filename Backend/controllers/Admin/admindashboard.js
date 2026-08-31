import { productModel } from "../../models/product.js";
import { orderModel } from "../../models/orderModel.js";
import { userModel } from "../../models/userModel.js";


export const getAdminDashboard = async (req, res) => {
  try {
    const [products, orders, users, recentOrders] = await Promise.all([
      productModel.countDocuments(),
      orderModel.countDocuments(),
      userModel.countDocuments(),

      orderModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "name email")
        .populate("products.productId", "title price image"),
    ]);

    console.log(products);
    return res.status(200).json({
      success: true,
      dashboard: {
        products,
        orders,
        users,
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
    });
  }
};