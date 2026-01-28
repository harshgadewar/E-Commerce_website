import {productModel} from "../models/product.js";

export const addListing = async (req, res) => {
  try {
    const userId = req.user._id; 

    console.log("userId :",userId);
    console.log(req.body);
    let { title, description, price, image } = req.body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All Fields required !!" });
    }

    const data = new productModel({
      title,
      description,
      price,
      image,
    });

    data.save();
    return res.status(200).json({ message: "data saved !!" });

    }
  
  catch (e) {
    return res.status(400).json({ error:e.message });
  }
};
