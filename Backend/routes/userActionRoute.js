import { alllistings, searchProducts } from "../controllers/listings.js";
import {
  cart,
  checkOutFeature,
  decreaseCartQuantity,
  increaseCartQuantity,
  viewCart,
} from "../controllers/user/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
import { buyNow, buyProductfromcart } from "../controllers/user/buyProduct.js";
import { myOrders } from "../controllers/user/myOrder.js";
import { viewProduct } from "../controllers/user/viewProduct.js";
import {
  adduseraddress,
  editUserAddress,
  getUserAddress,
} from "../controllers/user/userAddress.js";
import { getProductsByCategory } from "../controllers/user/fetchproductbycategory.js";
import { generateAccessToken } from "../controllers/auth/accessTokenController.js";

const router = express.Router();

router.get("/alllistings", alllistings);
router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProducts);
router.post("/addtocart/:productId", authMiddleware, cart);
router.patch("/cart/:cartId/increase", authMiddleware, increaseCartQuantity);
router.patch("/cart/:cartId/decrease", authMiddleware, decreaseCartQuantity);
router.get("/viewcart", authMiddleware, viewCart);
router.post("/buyproducts/:id", authMiddleware, buyProductfromcart);
router.post("/buy-now/:id",authMiddleware,buyNow);
router.get("/myorders", authMiddleware, myOrders);
router.get("/viewproduct/:id", viewProduct);
router.post("/saveaddress", authMiddleware, adduseraddress);
router.get("/getaddress", authMiddleware, getUserAddress);
router.put("/editaddress",authMiddleware, editUserAddress);
router.get("/cart/checkout", authMiddleware, checkOutFeature);
router.get("/refresh", generateAccessToken);

export default router;
