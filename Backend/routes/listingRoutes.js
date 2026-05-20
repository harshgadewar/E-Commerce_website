import { alllistings, searchedListings } from "../controllers/listings.js";
import { addListing,viewSellerProduct } from "../controllers/seller/sellerAction.js";
import { cart } from "../controllers/user/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
import { isadmin } from "../middleware/isAdminMiddleware.js";
import { isseller } from "../middleware/isSellerMiddleware.js";
const router = express.Router();

router.get("/", alllistings);
router.get("/searchedlisting", searchedListings);
router.get("/addtocart", authMiddleware, cart);

export default router;
