import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";

import { productModel } from "../models/product.js";
import { orderModel } from "../models/orderModel.js";

dotenv.config();

const instance = new Razorpay({
  key_id: process.env.RAZERPAY_KEY,
  key_secret: process.env.RAZERPAY_SECRET,
});


// ---------------- CREATE PAYMENT ORDER ----------------

export const payments = async (req,res)=>{

try{

const { productId, quantity } = req.body;

const product =
await productModel.findById(productId);

if(!product){
 return res.status(400).json({
  message:"invalid product"
 });
}


if(quantity > product.stockQuantity){
 return res.status(400).json({
  message:"stock unavailable"
 });
}


// price check from db
const amount =
product.price * quantity * 100;


const order =
await instance.orders.create({

 amount,
 currency:"INR",
 receipt:`receipt_${Date.now()}`

});


return res.json({

 success:true,
 order

});

}catch(e){

return res.status(500).json({
 message:e.message
})

}

};



// ---------------- VERIFY + SAVE ORDER ----------------


export const verifyPayment =
async(req,res)=>{

try{

const {

razorpay_order_id,
razorpay_payment_id,
razorpay_signature,

productId,
quantity,
shippingAddress

}=req.body;



// verify signature

const body =
razorpay_order_id +
"|" +
razorpay_payment_id;


const expectedSignature =
crypto
.createHmac(
 "sha256",
 process.env.RAZERPAY_SECRET
)
.update(body)
.digest("hex"); 


const valid =
expectedSignature ===
razorpay_signature;


if(!valid){

 return res.status(400).json({

 success:false,
 message:"payment failed"

 });

}



// login check

const user =
req.user._id;



// product check

const product =
await productModel.findById(
 productId
);


if(!product){

 return res.status(400)
 .json({
  message:"invalid product"
 });

}



if(quantity >
product.stockQuantity){

 return res.status(400)
 .json({
  message:"out of stock"
 });

}



// DB price

const totalPrice =
product.price *
quantity;



// SAVE ORDER

await orderModel.create({

 userId:user,

 productId,

 quantity,

 shippingAddress,

 totalPrice,

 paymentMethod:"ONLINE",

 paymentStatus:"completed",

 razorpay_order_id,

 razorpay_payment_id,

 razorpay_signature

});




// reduce stock AFTER save

// product.stockQuantity -= quantity;

// await product.save();

await productModel.findByIdAndUpdate(

productId,

{

$inc:{
 stockQuantity:-quantity
}

}

);

return res.json({

 success:true,

 message:
 "Order placed successfully"

});


}catch(e){


console.log(e);

return res.status(500)
.json({
 message:e.message
})

}

};