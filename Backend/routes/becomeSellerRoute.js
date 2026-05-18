import express from "express";
import {sellerRegistration} from "../controllers/seller/becomeSeller.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";

const router=express.Router();

router.post("/",authMiddleware,sellerRegistration);

export default router;