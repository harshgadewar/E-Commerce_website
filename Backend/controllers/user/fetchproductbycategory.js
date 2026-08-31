import { productModel } from "../../models/product.js";

export const getProductsByCategory = async (req, res) => {
  try {
 
    const { category } = req.params;

    const products = await productModel.find({
      category: {
        $regex: `^${category}$`,
        $options: "i",
      },
      isDelete: false,
    });

    
    return res.status(200).json(products);
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: "Failed to fetch category products",
      error: e.message,
    });
  }
};
