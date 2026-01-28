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
export const searchedListings = async (req, res) => {
  try {
    let { title } = req.query;

    let data = await productModel.findOne({ title:{ $regex: title, $options: "i" } });
    if (!data) {
      return res.status(400).json({ message: "something wents wrong" });
    }
res.json(data);

  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};
