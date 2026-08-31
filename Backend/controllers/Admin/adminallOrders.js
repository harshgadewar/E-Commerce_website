import { orderModel } from "../../models/orderModel.js";

export const adminallOrders=async(req,res)=>{
    try{

        console.log("order hitting");
    
    
    const data=await orderModel.find({});

    console.log(data);

    return res.status(200).json({message:"orders featched!",data});
    }catch(e){
        console.log(e.message);
return res.status(500).json({ error: e.message });
    }
}