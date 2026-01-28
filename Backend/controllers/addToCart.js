import { cartModel } from "../models/cartModel.js";

export const cart = async (req, res) => {
  try {
    console.log("cart hitting!!");

    const userId = req.user._id;

    console.log(userId);

    let { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "all fields required !!",
      });
    }

    let Data = await create.cartModel({
      userId,
      productId,
     
    });
    return res
      .status(201)
      .json({
        sucess: true,
        message: "Item sucessfully added into cart !!",
        cart: Data,
      });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};
