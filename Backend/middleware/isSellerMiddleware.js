
export const isseller=async(req,res ,next)=>{
try{
 if(!req.user){
        return res.status(401).json({message:"Login first"});
    }

    if(req.user.role != "seller"){
         return res.status(403).json({message:"seller access only"});
    }

    next();
}catch(e){
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
   
