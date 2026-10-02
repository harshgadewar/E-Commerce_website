import { productModel } from "../../models/product.js";
import { orderModel } from "../../models/orderModel.js";

export const buyProductfromcart = async (req, res) => {
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
    // if (paymentMethod == "UPI") {
    //   paymentStatus = "completed";
    // }

    let orderData = new orderModel({
      userId: user,

      products: [
        {
          productId: productId,
          quantity: quantity,
        },
      ],

      totalPrice: DataBaseProductPrice,
      shippingAddress,
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


export const buyNow = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    // Check login
    let user = req.user._id;
    if (!user) {
      return res.status(400).json({ message: "please login!!" });
    }

    // Validate quantity
    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.stockQuantity <= 0) {
      return res.status(400).json({
        message: "Product is out of stock",
      });
    }

    if (quantity > product.stockQuantity) {
      return res.status(400).json({
        message: `Only ${product.stockQuantity} items available`,
      });
    }

    const totalPrice = product.price * quantity;

    return res.status(200).json({
      message: "Buy Now data fetched successfully",

      product: {
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
      },

      quantity,
      totalPrice,
    });
  } catch (e) {
  console.log("Buy Now Error:", e);
  console.log("Server response:", e.response?.data);
}
};
