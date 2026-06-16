import { generateAccessTokenutil } from "../../utils/generateAccessToken.js";
import jwt from "jsonwebtoken";

export const generateAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token not found" });
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  const tokenExists = await redisClient.get(refreshToken);

  if(!tokenExists){
    return res.status(400).json({ message: "Invalid refresh token" });
  }

  const accessToken = generateAccessTokenutil(decoded.id);

  return res.json({
    accessToken,
  });
};
