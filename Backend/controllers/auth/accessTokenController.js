import jwt from "jsonwebtoken";
import { redisClient } from "../../config/redis.js";
import { generateAccessTokenutil } from "../../utils/generateAccessToken.js";

export const generateAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const tokenExists = await redisClient.get(refreshToken);

    if (!tokenExists) {
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessTokenutil(decoded.id);

    // res.cookie("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "lax",
    //   maxAge: 15 * 60 * 1000,
    // });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (err) {
    console.log("Refresh token error:", err);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};
