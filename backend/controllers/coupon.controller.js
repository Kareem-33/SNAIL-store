import Coupon from "../models/coupon.model.js"

export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    if(!coupons){
      return res.status(404).json({success:false, message: "There are no coupons"});
    }
    res.status(200).json({success: true, message: "User's coupon fetched successfully", data:coupons});
  } catch (error) {
    console.error(`Error in getCoupon controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const validateCoupon = async (req, res) => {
  try {
    const {code} = req.body;
    const coupon = await Coupon.findOne({code, isActive: true});
    if(!coupon){
      return res.status(400).json({success:false, message: "Coupon is not valid or expired"});
    }
    if(!coupon.expirationDate || new Date(coupon.expirationDate) < new Date()){
      coupon.isActive = false;
      await coupon.save();
      return res.status(400).json({success:false, message: "Coupon is expired"});
    }
    res.status(200).json({success: true, message: "Coupon is valid", data:{code, discountPercentage: coupon.discountPercentage}});
  } catch (error) {
    console.error(`Error in validateCoupon controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const addCoupon = async (req, res) => {
  try {
    const {code, discountPercentage, expirationDate, isActive} = req.body;
    const coupon = new Coupon({
      code,
      discountPercentage,
      expirationDate,
      isActive,
    })
    await coupon.save();
    res.status(201).json({success: true, message: "Coupon added successfully", data: coupon});
  } catch (error) {
    console.error(`Error in addCoupon controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const deleteCoupon = async (req, res) => {
  try {
    const {id} = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if(!coupon){
      return res.status(404).json({success:false, message: "Coupon not found"});
    }
    res.status(200).json({success: true, message: "Coupon deleted successfully", data: coupon});
  } catch (error) {
    console.error(`Error in deleteCoupon controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}