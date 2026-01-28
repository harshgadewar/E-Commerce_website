import { alllistings, searchedListings } from "../controllers/listings.js";
import { addListing } from "../controllers/addListing.js";
import { cart } from "../controllers/addToCart.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
import express from "express";
const router = express.Router();

router.get("/", alllistings);
router.post("/addlistings", authMiddleware, addListing);
router.get("/searchedlisting", searchedListings);
router.get("/addtocart", authMiddleware, cart);

export default router;
