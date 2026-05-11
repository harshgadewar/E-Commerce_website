import { userModel } from "../../models/userModel";
import { productModel } from "../../models/product";

//delete seller

export const deleteSeller = async (req, res) => {
  try {
    const sellerId = req.params._id;

    if (!sellerId) {
      return res.status(400).json({ message: "Invalid id" });
    }

    userModel.findByIdAndDelete({ sellerId });

    return res.status(204).json({ message: "Seller deleted sucessfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete product

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params._id;

    if (!productId) {
      return res.status(400).json({ message: "Invalid id" });
    }

    productModel.findByIdAndDelete({ productId });
    return res.status(204).json({ message: "Product deleted sucessfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//delete user

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params._id;

    if (!userId) {
      return res.status(400).json({ message: "Invalid id" });
    }

    userModel.findByIdAndDelete({ userId });

    return res.status(204).json({ message: "User deleted sucessfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

//block user

export const blockseller = async (req, res) => {
  try {
    const sellerId = req.params._id;

    if (!sellerId) {
      return res.status(400).json({ message: "Invalid id" });
    }

    req.user.isBlock = true;

    return res.status(200).json({ message: "user blocked sucessfully" });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
