import { alllistings, searchedListings } from "../controllers/listings.js";
import { addListing,viewSellerProduct } from "../controllers/seller/sellerAction.js";
import { cart } from "../controllers/user/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
import { isadmin } from "../middleware/isAdminMiddleware.js";
import { isseller } from "../middleware/isSellerMiddleware.js";
import { buyProduct } from "../controllers/user/buyProduct.js";
import { myOrders } from "../controllers/user/myOrder.js";
const router = express.Router();

router.get("/alllistings", alllistings);
router.get("/searchedproducts", searchedListings);
router.get("/addtocart", authMiddleware, cart);
router.post("/buyproducts/:id", authMiddleware, buyProduct);
router.get("/myorders", authMiddleware, myOrders);

export default router;
