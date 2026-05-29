import express from "express";
import { payments,verifyPayment } from "../controllers/paymentController.js";
import { authMiddleware } from "../middleware/authoMiddleware.js";
const router=express.Router();

router.post("/",authMiddleware,payments);
router.post("/verify",authMiddleware, verifyPayment);

export default router;