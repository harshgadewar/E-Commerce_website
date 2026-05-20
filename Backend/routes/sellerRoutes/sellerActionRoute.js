import express from "express";
 import { authMiddleware } from "../../middleware/authoMiddleware.js";
 import { isseller } from "../../middleware/isSellerMiddleware.js";
 import { addListing,viewSellerProduct,update,deleteProduct } from "../../controllers/seller/sellerAction.js";

const router=express.Router();

router.post("/addproduct", authMiddleware,isseller, addListing);
router.get("/viewsellerproduct", authMiddleware,isseller,viewSellerProduct );
router.post("/updateproduct/:id", authMiddleware,isseller,update );
router.post("/deleteproduct/:id", authMiddleware,isseller,deleteProduct);

export default router;