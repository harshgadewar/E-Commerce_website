import express from "express";
import {login,signup} from '../controllers/loginSignup.js'
import { authLimiter } from "../middleware/rateLimiterMiddleware.js";

const router=express.Router();


router.get("/login",authLimiter,login);
router.post("/signup",authLimiter,signup)

export default router;