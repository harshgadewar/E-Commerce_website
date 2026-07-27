import { alllistings, searchedListings } from "../controllers/listings.js";
import {
  addListing,
  viewSellerProduct,
} from "../controllers/seller/sellerAction.js";
import { cart, decreaseCartQuantity, increaseCartQuantity, viewCart } from "../controllers/user/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
import { isadmin } from "../middleware/isAdminMiddleware.js";
import { isseller } from "../middleware/isSellerMiddleware.js";
import { buyProduct } from "../controllers/user/buyProduct.js";
import { myOrders } from "../controllers/user/myOrder.js";
import { viewProduct } from "../controllers/user/viewProduct.js";

const router = express.Router();

router.get("/alllistings", alllistings);
router.get("/searchedproducts", searchedListings);
router.post("/addtocart/:productId", authMiddleware, cart);
router.patch("/cart/:cartId/increase", authMiddleware, increaseCartQuantity);
router.patch("/cart/:cartId/decrease", authMiddleware, decreaseCartQuantity);
router.get("/viewcart", authMiddleware, viewCart);
router.post("/buyproducts/:id", authMiddleware, buyProduct);
router.get("/myorders", authMiddleware, myOrders);
router.get("/viewproduct/:id", viewProduct);

export default router;
