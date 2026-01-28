import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";

import { generateToken } from "../utils/generateToken.js";

export let login = async (req, res) => {
  console.log("hitting!");

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
    let token = generateToken(user._id);
    console.log(user);
    console.log(user._id);
    
    console.log("Generated Token:", token);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const signup = async (req, res) => {
  console.log("signuphitting!");
  const { name, email, password } = req.body;

  console.log(name);
    console.log(email);

      console.log(password);

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

              console.log(newUser);

    await newUser.save();

    res.status(200).json({ message: "user registerd" });
  } catch (e) {
    console.error("Signup error:", e);
    res.json({ message: `something went wrong ${e}` });
  }
};
