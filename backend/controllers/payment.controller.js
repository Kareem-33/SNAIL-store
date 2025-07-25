
export const createOrder = async (req, res) => {
  try {
    const {products, couponCode} = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }
    let totalAmount = 0;
    products.forEach(product => {
      totalAmount += product.price * product.quantity;
    });
    let coupon = null;
    if(couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
      if(coupon) {
        totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
      }
    }
    const order = new Order({
      userId: req.user._id,
      products,
      totalAmount,
    });
    await order.save();
    // Logic for creating a payment
    res.status(201).json({ success: true, message: "Order created successfully", data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
}