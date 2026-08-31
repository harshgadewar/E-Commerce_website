import { productModel } from "../../models/product.js";
import cloudinary from "../../config/cloudnary.js";
import { sellerModel } from "../../models/sellerModel.js";

//add product

export const addListing = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, description, price, stockQuantity, category } = req.body;

    if (!title || !description || !price || !stockQuantity || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "velora/products",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      stream.end(req.file.buffer);
    });

    // Save product in MongoDB
    const data = new productModel({
      title,
      description,
      price,
      stockQuantity,
      image: result.secure_url,
      category,
      sellerId: userId,
    });

    await data.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: data,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: "Failed to add product",
    });
  }
};

//view
export const adminviewallProduct = async (req, res) => {
  try {
    const sellerId = req.user._id;
    if (!sellerId) {
      return res.status(400).json({ message: "login first" });
    }

    const data = await productModel.find({ sellerId });
    console.log(data);
    return res.status(200).json({ message: "Data Fetched successfully", data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

//view product by id

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//update

export const update = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, description, price, stockQuantity, category } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Invalid productId",
      });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product does not exist",
      });
    }

    const updatedData = {
      title,
      description,
      price,
      stockQuantity,
      category,
    };

    if (req.file) {
      console.log("New image received");

      const imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "velora/products",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result.secure_url);
            }
          },
        );

        stream.end(req.file.buffer);
      });

      updatedData.image = imageUrl;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};

//delete

export const deleteProduct = async (req, res) => {
  try {
    console.log("delete!!!");
    const sellerId = req.user._id;
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(400).json({ message: "Invalid productid" });
    }

    if (sellerId.toString() !== product.sellerId.toString()) {
      return res.status(403).json({
        message: "You can delete only your products",
      });
    }

    await productModel.findByIdAndUpdate(id, {
      isDelete: true,
    });

    return res.status(200).json({ message: "product deleted" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
