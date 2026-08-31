import { addressModel } from "../../models/userAddressModel.js";

export const adduseraddress = async (req, res) => {
  try {
    let { firstname, lastname, phoneno, address, pincode, city, state } =
      req.body;

    const userId = req.user._id;

    if (
      !firstname ||
      !lastname ||
      !phoneno ||
      !address ||
      !pincode ||
      !city ||
      !state ||
      !userId
    ) {
      return res.status(400).json({ message: "all fields required!!" });
    }

    let newaddress = new addressModel({
      firstname,
      lastname,
      phoneno,
      address,
      pincode,
      city,
      state,
      userId,
    });

    await newaddress.save();
    console.log("address savedd conolse one");
    return res.status(200).json({ message: "Address saved!!!!!" });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};



export const getUserAddress = async (req, res) => {
  try {
    const userId = req.user._id;

    const address = await addressModel.findOne({ userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    return res.status(200).json({
      success: true,
      address,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};