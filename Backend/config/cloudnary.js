import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("Cloud name:", process.env.CLOUD_NAME);
console.log("API key exists:", !!process.env.CLOUD_KEY);
console.log("Secret exists:", !!process.env.CLOUD_SECRET);
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});



export default cloudinary;
