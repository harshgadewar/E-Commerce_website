import { alllistings, searchedListings } from "../controllers/listings.js";
import { addListing } from "../controllers/user/addListing.js";
import { cart } from "../controllers/user/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
import { isadmin } from "../middleware/isAdminMiddleware.js";
const router = express.Router();

router.get("/", alllistings);
router.post("/addlistings", authMiddleware,isadmin, addListing);
router.get("/searchedlisting", searchedListings);
router.get("/addtocart", authMiddleware, cart);

export default router;
