import { productModel } from "../../models/product.js";
import { sellerModel } from "../../models/sellerModel.js";

export const addListing = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("userId :", userId);
    console.log(req.body);
    let { title, description, price, image } = req.body;

    if (!title || !description || !price || !image) {
      return res.status(400).json({ message: "All Fields required !!" });
    }

    const data = new productModel({
      title,
      description,
      price,
      image,
      sellerId: userId,
    });

    await data.save();
    return res.status(200).json({ message: "data saved !!" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

export const viewSellerProduct = async (req, res) => {
  try {
    const sellerId=req.user._id;
    if(!sellerId){
          return res.status(400).json({ message: "login first" });

    }
   

    const data=await productModel.find({sellerId});
  
       return res.status(200).json({ message:"Data Fetched successfully",data });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

// export const update=async(req,res)=>{
//   try{
//     let{title,description,price,image,stockQuantity}=req.body;
//     const{productId}=req.params;

//       const userId=req.user._id;

//       if(productId)

// const updatedData=productModel.findByIdAndUpdate(productId,
//   {
//     title,
//     description,
//     price,
//     image,
//     stockQuantity
//   }
// )

//   }catch(e){

//   }
// }
