import { myOrders } from "../controllers/myOrder.js";
import {authMiddleware} from "../middleware/authoMiddleware.js";
import express from "express";


const router=express.Router();

router.get("/",authMiddleware,myOrders);

export default router;