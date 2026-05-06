import express from "express";
import crypto from "crypto";
import EmailOtp from "../models/emailOtp.js";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const otp = generateOtp();

    await EmailOtp.findOneAndUpdate(
      { email },
      {
        otp,
        verified: false,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true },
    );

    await sendEmail(email, otp);

    return res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {

    console.log("BODY:jvjv", req.body);

    const { email, otp } = req.body;

    // 1️⃣ Basic validation
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // 2️⃣ Find OTP record
    const record = await EmailOtp.findOne({ email });

    if (!record) {
      return res.status(400).json({
        message: "OTP not found. Please request again.",
      });
    }

    // 3️⃣ Expiry check
    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        message: "OTP expired. Please resend OTP.",
      });
    }

    // 4️⃣ OTP match check
    if (record.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    // 5️⃣ Mark email as verified
    record.verified = true;
    await record.save();

    // 6️⃣ Generate verification token (IMPORTANT)
    const verificationToken = crypto.randomBytes(32).toString("hex");

    return res.status(200).json({
      message: "Email verified successfully",
      verificationToken,
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return res.status(500).json({
      message: "Failed to verify OTP",
    });
  }
});

export default router;
