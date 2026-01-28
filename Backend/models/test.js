import mongoose  from "mongoose";

const test = mongoose.Schema({
    product:String,
    price:String
})

const testModel=mongoose.model("testModel",test);

export default testModel;
