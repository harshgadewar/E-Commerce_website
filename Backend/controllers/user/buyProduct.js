import { productModel } from "../../models/product.js";
import { orderModel } from "../../models/orderModel.js";

export const buyProduct = async (req, res) => {
  try {
    let { paymentMethod, shippingAddress, quantity } = req.body;
    let productId = req.params.id;

    if (!productId || !shippingAddress || !quantity || !paymentMethod) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      !quantity ||
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    let user = req.user._id;
    if (!user) {
      return res.status(400).json({ message: "please login!!" });
    }

    let product = await productModel.findById(productId);

    if (!product) {
      return res.status(400).json({ message: "Invalid productId" });
    }

    if (product.stockQuantity == 0) {
      return res.status(400).json({ message: "product is out of stock" });
    } else if (quantity > product.stockQuantity) {
      return res
        .status(400)
        .json({ message: "please decrease product quantity" });
    }
    let paymentStatus = "pending";

    let DataBaseProductPrice = product.price * quantity;
    if (paymentMethod == "UPI") {
      paymentStatus = "completed";
    }

    let orderData = new orderModel({
      userId: user,
      productId,
      totalPrice: DataBaseProductPrice,
      shippingAddress,
      quantity,
      paymentMethod,
      paymentStatus,
    });
    let updatedStock = product.stockQuantity - quantity;

    let productdata = await productModel.findByIdAndUpdate(productId, {
      stockQuantity: updatedStock,
    });

    await orderData.save();

    return res
      .status(201)
      .json({ message: "Order placed sucessfully", user, productId });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error " });
  }
};
