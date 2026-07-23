import express from "express";
import { login, logout, signup } from "../controllers/auth/loginSignup.js";
import { authLimiter } from "../middleware/rateLimiterMiddleware.js";
import { generateAccessToken } from "../controllers/auth/accessTokenController.js";

const router = express.Router();

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.get("/logout",logout)
router.get("/accesstoken",generateAccessToken)

export default router;
