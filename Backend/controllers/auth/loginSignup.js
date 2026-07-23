import { userModel } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import { redisClient } from "../../config/redis.js";
import { generateRefreshToken } from "../../utils/generateRefreshToken.js";
import { generateAccessToken } from "./accessTokenController.js";
import { generateAccessTokenutil } from "../../utils/generateAccessToken.js";

// signup

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      return res.status(302).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "user registerd" });
  } catch (e) {
    console.error("Signup error:", e);
    res.json({ message: `something went wrong ${e}` });
  }
};

// login

export let login = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "please fill all the fields" });
  }

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //access token and refresh token

    const refreshToken = generateRefreshToken(user._id);

    await redisClient.set(refreshToken, user._id.toString(), {
      EX: 7 * 24 * 60 * 60, //refresh token set in redis
    });

    const acessToken = generateAccessTokenutil(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.cookie("accessToken", acessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    console.log(acessToken);
    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "internal server error" });
  }
};

//logout

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    await redisClient.del(refreshToken);

    return res.status(200).json({ message: "logout sucessfully!!" });
  } catch (e) {
    return res.status(500).json({ message: "internal server error" });
  }
};
