import { productModel } from "../models/product.js";

//All Listings 
export const alllistings = async (req, res) => {
  try {
    let data = await productModel.find({});
    if (!data) {
      return res.status(400).json({ message: "something wents wrong" });
    }
    res.send(data);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};


//Searched Listings
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(200).json([]);
    }

    const products = await productModel.find({
      isDelete: false,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ],
    });

    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({
      message: "Search failed",
      error: e.message,
    });
  }
};
