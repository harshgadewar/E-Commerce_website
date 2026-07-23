import jwt from "jsonwebtoken";
import {userModel} from "../models/userModel.js";

// export const authMiddleware = async (req, res, next) => {
//   // const authHeader = req.headers.authorization;

//   // if (!authHeader || !authHeader.startsWith("Bearer ")) {
//   //   return res.status(401).json({ message: "Token missing or malformed" });
//   // }

//   // const token = authHeader.split(" ")[1];

//     const token = req.cookies.accessToken;  
// console.log("cookie1",req.cookies);
// console.log("cookie2",req.cookies.accessToken);
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await userModel.findById(decoded.id).select("-password");

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Auth Error:", err.message);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

//need to revise this concept


export const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Cookie check
  if (req.cookies.accessToken) {
    token = req.cookies.accessToken;
  }

  // 2. Authorization header check
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};