// import { cartModel } from "../../models/cartModel.js";

// export const cart = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     let { productId } = req.body;

//     if (!productId) {
//       return res.status(400).json({
//         success: false,
//         message: "all fields required !!",
//       });
//     }

//     let Data = await create.cartModel({
//       userId,
//       productId,
//     });
//     return res.status(201).json({
//       sucess: true,
//       message: "Item sucessfully added into cart !!",
//       cart: Data,
//     });
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ success: false, message: "iiinternal server error " });
//   }
// };

// export const viewCart = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const data=await cartModel.find(userId);

//     return res.json({data});
//   } catch (e) {
//     return res
//       .status(500)
//       .json({ success: false, message: "internal server error " });
//   }
// };

import { cartModel } from "../../models/cartModel.js";

// Add to Cart
export const cart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId,quantity } = req.body;
     
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const data = await cartModel.create({
      userId,
      productId,
      quantity
    });
    
    return res.status(201).json({
      success: true,
      message: "Item successfully added to cart",
      cart: data,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// View Cart
export const viewCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const data = await cartModel
      .find({ userId })
      .populate("productId");

    return res.status(200).json({
      success: true,
      cart: data,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};