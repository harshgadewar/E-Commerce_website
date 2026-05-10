import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many attempts, try later",
  },
});