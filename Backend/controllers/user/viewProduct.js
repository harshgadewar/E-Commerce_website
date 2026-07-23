import { productModel } from "../../models/product.js";

export const viewProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await productModel.findById(id);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
