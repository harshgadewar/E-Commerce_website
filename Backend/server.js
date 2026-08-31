import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {errorMiddleware} from "./middleware/errorMiddleware.js"; 
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import {redisClient} from "./config/redis.js";


//campus x dsmp 2.0
//code basics
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
app.use(cookieParser());





//---------------------------------------routes-----------------------------------------------------


import testModel from "./models/test.js";
import useractionRoutes from "./routes/userActionRoute.js";
import signupLoginRoute from './routes/loginSignupRoute.js';
import emailOtpRoutes from "./routes/emailOtp.js";
import adminActionRoute from "./routes/adminRoutes/adminActionRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import testUploadRoute from "./routes/clouderoute.js";


const url = process.env.MONGODB_URL;




//----------------------------------------------apis---------------------------------------------

//login
app.use("/",signupLoginRoute);

//useraction
app.use("/useraction",useractionRoutes);

//email verification
app.use("/email", emailOtpRoutes);

//admin route
app.use("/admin",adminActionRoute)

//payment route
app.use("/payment",paymentRouter);

//cloud
app.use("/test", testUploadRoute);

app.get("/redis-test", async (req, res) => {

 await redisClient.set(
   "name",
   "harsh"
 );

 const data =
 await redisClient.get(
   "name"
 );

 res.json({
   data
 });

});

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
