import mongoose from "mongoose";
import { userModel } from "./userModel.js";

const addressSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
      lastname:{
        type:String,
        required:true
    },
      phoneno:{
        type:String,
        required:true
    },
      address:{
        type:String,
        required:true
    },
      pincode:{
        type:String,
        required:true
    },
  city:{
        type:String,
        required:true
    },
  state:{
        type:String,
        required:true
    },
});

export const addressModel=new mongoose.model("addressmodel",addressSchema);