import { sellerModel } from "../../models/sellerModel";
import { userModel } from "../../models/userModel";

export const sellerRegistration=async(req,res)=>{
    try{
    if(!req.user){
        return res.status(400).json({message:"Login first"});
    }
    const userId=req.user._id;
     
    const isSellerExist=await sellerModel.findOne({userId});

    if(isSellerExist){
        return res.status(400).json({message:"User already exisit"});
    }
    

    let{gst,shopName,pan}=req.body;

    if(!gst || !shopName || !pan){
        return res.status(400).json({message:"All fields are required"});
    }

    

const data=new sellerModel({
    userId,
    gst,
    shopName,
    pan
})

await data.save();

await userModel.findByIdAndUpdate(
  userId,
  {
    role: "seller",
  }
);

return res.status(200).json({message:"Registered sucessfully!!"});
    }catch(e){
    return res.status(400).json({ error: e.message });

    }
}