import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import emailOtpRoutes from "./routes/emailOtp.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


//middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
import testModel from "./models/test.js";
import productRoutes from "./routes/productRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import signupLoginRoute from './routes/loginSignupRoute.js';
import buyProductRoute from './routes/buyProductRoute.js';

const url = process.env.MONGODB_URL;




//api
app.use("/",signupLoginRoute);
app.use("/alllistings",listingRoutes);
app.use("/email", emailOtpRoutes);
app.use("/buyproduct",buyProductRoute);



const start = async() => {
 try{ 
    app.listen("8080", () => {
    console.log("server is RUNNING !!");
  });


  mongoose.connect(url);
  console.log("DataBase Conntected!!");
}catch(e){
    return res.status(400).json({message:e});
}
};

start();
