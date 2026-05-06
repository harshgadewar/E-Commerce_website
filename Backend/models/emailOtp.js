import mongoose from "mongoose";

const emailOtpSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("EmailOtp", emailOtpSchema);