import mongoose from "mongoose";

const product= mongoose.Schema({
title:{
    type:String,
    required: true,
  },
description:{
    type:String,
    required: true,
  },
price:{
    type:Number,
    required: true,
  },
image:{
    type:String,
    required: true,
  }
})

export const productModel=mongoose.model("productModel",product);