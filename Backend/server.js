import dotenv from "dotenv";
dotenv.config();

import {errorMiddleware} from "./middleware/errorMiddleware.js"; 
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";


const app = express();

// --------------------------------------- RATE LIMIT ------------------------------------------------------------

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});


app.set("trust proxy", 1);

// apply globally
app.use(limiter);


//---------------------------------------CORS--------------------------------------------------------

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


//--------------------------------------middlewares----------------------------------------------
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true ,limit: "10kb"}));
app.use(hpp());
app.use(helmet());
app.use(morgan("dev"));
// app.use(mongoSanitize());




//---------------------------------------routes-----------------------------------------------------


import testModel from "./models/test.js";
import productRoutes from "./routes/productRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";
import signupLoginRoute from './routes/loginSignupRoute.js';
import buyProductRoute from './routes/buyProductRoute.js';
import myOrdersRoute  from "./routes/myordersRoute.js";
import emailOtpRoutes from "./routes/emailOtp.js";
import becomeSellerRoute from "./routes/becomeSellerRoute.js"

const url = process.env.MONGODB_URL;




//----------------------------------------------apis---------------------------------------------


app.use("/",signupLoginRoute);
app.use("/alllistings",listingRoutes);
app.use("/email", emailOtpRoutes);
app.use("/buyproduct",buyProductRoute);
app.use("/myorders",myOrdersRoute);
app.use("/becomeseller",becomeSellerRoute);

//err handling middleware
app.use(errorMiddleware);


const start = async() => {
 try{ 
  await mongoose.connect(url);
  console.log("DataBase Conntected!!");

    app.listen("8080", () => {
    console.log("server is RUNNING !!");
  });


  
}catch(e){
    console.log(e.message);
}
};

start();
