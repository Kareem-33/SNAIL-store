import mongoose, { disconnect } from "mongoose";

const couponSchema = new mongoose.Schema({
  code:{
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage:{
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;