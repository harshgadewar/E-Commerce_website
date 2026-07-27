import { cartModel } from "../../models/cartModel.js";
import { productModel } from "../../models/product.js";

// Add to Cart
export const cart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { quantity } = req.body;
 
    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }
   

    // Product exists?
    const productInfo = await productModel.findById(productId);
   
    if (!productInfo) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Stock check
    if (productInfo.stockQuantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Requested quantity is not available",
      });
    }

    // Already in cart?
    const cartInfo = await cartModel.findOne({
      userId,
      productId,
    });

    if (cartInfo) {
      const newQuantity = cartInfo.quantity + quantity;

      if (newQuantity > productInfo.stockQuantity) {
        return res.status(400).json({
          success: false,
          message: "Cannot add more than available stock",
        });
      }

      cartInfo.quantity = newQuantity;
      cartInfo.total = newQuantity * productInfo.price;


      await cartInfo.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: cartInfo,
      });
    }

    // First time add
    const data = await cartModel.create({
      userId,
      productId,
      quantity,
      total: quantity * productInfo.price,
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

    const data = await cartModel.find({ userId }).populate("productId");

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

//inc cart quantity
export const increaseCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartId } = req.params;
    console.log(cartId);

    // Find cart item
    const cart = await cartModel
      .findOne({
        _id: cartId,
        userId,
      })
      .populate("productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Check stock
    if (cart.quantity >= cart.productId.stockQuantity) {
      return res.status(400).json({
        success: false,
        message: "Maximum stock reached",
      });
    }

    // Increase quantity
    cart.quantity += 1;

    // If you're storing total
    cart.total = cart.quantity * cart.productId.price;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity increased",
      cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//dec cart qunanity|

export const decreaseCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cartId } = req.params;

    const cart = await cartModel
      .findOne({
        _id: cartId,
        userId,
      })
      .populate("productId");

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // If quantity becomes zero, remove item
    if (cart.quantity === 1) {
      await cart.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Item removed from cart",
      });
    }

    // Decrease quantity
    cart.quantity -= 1;

    // If you're storing total
    cart.total = cart.quantity * cart.productId.price;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Quantity decreased",
      cart,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
