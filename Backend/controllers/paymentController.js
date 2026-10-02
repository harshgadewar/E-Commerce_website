import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";


import { productModel } from "../models/product.js";
import { orderModel } from "../models/orderModel.js";

import { cartModel } from "../models/cartModel.js";
import { addressModel } from "../models/userAddressModel.js";



dotenv.config();

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// // ---------------- CREATE PAYMENT ORDER ----------------

// export const payments = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     // Get all cart items
//     const cart = await cartModel.find({ userId }).populate("productId");

//     if (cart.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty",
//       });
//     }

//     let totalAmount = 0;

//     for (const item of cart) {
//       const product = item.productId;

//       // Product deleted
//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       // Stock check
//       if (item.quantity > product.stockQuantity) {
//         return res.status(400).json({
//           success: false,
//           message: `${product.title} has insufficient stock`,
//         });
//       }

//       totalAmount += product.price * item.quantity;
//     }

//     // Convert ₹ to paise
//     const order = await instance.orders.create({
//       amount: totalAmount * 100,
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     });

//     return res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (e) {
//     console.error(e.message);

//     return res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };

// // ---------------- VERIFY + SAVE ORDER ----------------```````````````````

// export const verifyPayment = async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//       req.body;

//     // ---------------- VERIFY SIGNATURE ----------------

//     const body = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     const userId = req.user._id;

//     // ---------------- GET CART ----------------

//     const cart = await cartModel.find({ userId }).populate("productId");

//     if (cart.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Cart is empty",
//       });
//     }

//     // ---------------- GET DEFAULT ADDRESS ----------------

//     const address = await addressModel.findOne({ userId });

//     if (!address) {
//       console.log("address not found!!");
//       return res.status(400).json({
//         success: false,
//         message: "Address not found",
//       });
//     }

//     let totalPrice = 0;

//     // ---------------- STOCK CHECK ----------------

//     for (const item of cart) {
//       const product = item.productId;

//       if (item.quantity > product.stockQuantity) {
//         return res.status(400).json({
//           success: false,
//           message: `${product.title} is out of stock`,
//         });
//       }

//       totalPrice += product.price * item.quantity;
//     }

//     // ---------------- CREATE ORDER ----------------

//     await orderModel.create({
//       userId,

//       products: cart.map((item) => ({
//         productId: item.productId._id,
//         quantity: item.quantity,
//       })),

//       shippingAddress: address,

//       totalPrice,

//       paymentMethod: "ONLINE",
//       paymentStatus: "completed",

//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     });
//     ///-------------------------------------------------------------

//     // ---------------- REDUCE STOCK ----------------
//     console.log("STARTING STOCK UPDATE");
//     for (const item of cart) {
//       console.log("Updating:", item.productId._id);
//       console.log("Current stock:", item.productId.stockQuantity);
//       await productModel.findByIdAndUpdate(item.productId._id, {
//         $inc: {
//           stockQuantity: -item.quantity,
//         },
//       });
//     }

//     // ---------------- CLEAR CART ----------------

//     await cartModel.deleteMany({ userId });

//     return res.status(200).json({
//       success: true,
//       message: "Order placed successfully",
//     });
//   } catch (e) {
//     console.log(e.response);
//     console.log(e.response.data);
//     console.error(e);
//     console.error(e.message);
//     console.log(e.response?.data);
//     return res.status(500).json({
//       success: false,
//       message: e.message,
//     });
//   }
// };

export const payments = async (req, res) => {
  try {
    const userId = req.user._id;
    const { buyNow, productId, quantity } = req.body;

    let totalAmount = 0;

    // ================= BUY NOW =================
    if (buyNow) {
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Product and quantity are required",
        });
      }

      const product = await productModel.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (product.stockQuantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Product is out of stock",
        });
      }

      if (quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: "Insufficient stock",
        });
      }

      totalAmount = product.price * quantity;
    }

    // ================= CART =================
    else {
      const cart = await cartModel
        .find({ userId })
        .populate("productId");

      if (cart.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Cart is empty",
        });
      }

      for (const item of cart) {
        const product = item.productId;

        if (!product) {
          return res.status(404).json({
            success: false,
            message: "Product not found",
          });
        }

        if (item.quantity > product.stockQuantity) {
          return res.status(400).json({
            success: false,
            message: `${product.title} has insufficient stock`,
          });
        }

        totalAmount += product.price * item.quantity;
      }
    }

    // ================= RAZORPAY =================

    const order = await instance.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,

      // Useful for identifying Buy Now later
      notes: {
        buyNow: buyNow ? "true" : "false",
        productId: buyNow ? productId : "",
        quantity: buyNow ? String(quantity) : "",
      },
    });

    return res.status(200).json({
      success: true,
      order,
      totalAmount,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};




export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // ================= VERIFY SIGNATURE =================

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    const userId = req.user._id;

    // ================= GET RAZORPAY ORDER =================

    const razorpayOrder =
      await instance.orders.fetch(razorpay_order_id);

    const isBuyNow =
      razorpayOrder.notes?.buyNow === "true";

    // ================= ADDRESS =================

    const address = await addressModel.findOne({ userId });

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address not found",
      });
    }

    // =====================================================
    //                    BUY NOW
    // =====================================================

    if (isBuyNow) {
      const productId = razorpayOrder.notes.productId;
      const quantity = Number(razorpayOrder.notes.quantity);

      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          message: "Invalid Buy Now payment data",
        });
      }

      const product = await productModel.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      // Check stock AGAIN
      if (product.stockQuantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} is out of stock`,
        });
      }

      const totalPrice = product.price * quantity;

      // Create order
      await orderModel.create({
        userId,

        products: [
          {
            productId: product._id,
            quantity,
          },
        ],

        shippingAddress: address,

        totalPrice,

        paymentMethod: "ONLINE",
        paymentStatus: "completed",

        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      // Reduce stock
      await productModel.findByIdAndUpdate(
        product._id,
        {
          $inc: {
            stockQuantity: -quantity,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Buy Now order placed successfully",
      });
    }

    // =====================================================
    //                       CART
    // =====================================================

    const cart = await cartModel
      .find({ userId })
      .populate("productId");

    if (cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalPrice = 0;

    for (const item of cart) {
      const product = item.productId;

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      if (item.quantity > product.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: `${product.title} is out of stock`,
        });
      }

      totalPrice += product.price * item.quantity;
    }

    // Create cart order
    await orderModel.create({
      userId,

      products: cart.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),

      shippingAddress: address,

      totalPrice,

      paymentMethod: "ONLINE",
      paymentStatus: "completed",

      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Reduce stock
    for (const item of cart) {
      await productModel.findByIdAndUpdate(
        item.productId._id,
        {
          $inc: {
            stockQuantity: -item.quantity,
          },
        }
      );
    }

    // Clear cart ONLY for cart checkout
    await cartModel.deleteMany({ userId });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });

  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
