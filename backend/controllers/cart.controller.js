import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getCartItems = async (req, res) => {
  try {
    const user = req.user;
    const products = await Product.find({_id: {$in: user.cartItems}});
    if(!products) {
      return res.status(404).json({success: false, message: "No items in the cart"});
    }
    const cartItems = products.map(product => {
      const item = user.cartItems.find(cItem => cItem.id === product.id);
      return {...product.toJSON(), quantity: item.quantity};
    });
    res.status(200).json({success: true, message: "User's cart items fetched successfully", data: cartItems});
  } catch (error) {
    console.log(`Error in getCartItems controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const addToCart = async (req, res) => {
  try {
    const {productId} = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(item => item.id === productId);
    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push(productId)
    }
    
    await user.save();

    res.status(200).json({ success: true, message: "Item added to cart successfully", data: user.cartItems });
  } catch (error) {
    console.log(`Error in addToCart controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const clearCart = async (req, res) => {
  try {
    const user = req.user;
    if(!user.cartItems.length){
      return res.status(200).json({success: false, message: "There is no items in cart to clear"});
    }
    user.cartItems = [];
    await user.save();
    res.status(200).json({success: true, message: "Cart cleared successfully", data: user.cartItems});
  } catch (error) {
    console.log(`Error in clearCart controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const {id: productId} = req.params;
    const user = req.user;

    user.cartItems = user.cartItems.filter(item => item.id !== productId);

    await user.save();
    res.status(200).json({success: true, message: "Item removed successfully", data: user.cartItems});
  } catch (error) {
    console.log(`Error in removeFromCart controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const updateItemQuantity = async (req, res) => {
  try {
    const {id: productId} = req.params;
    const {quantity} = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find(item => item.id === productId);
    if(!existingItem){
      return res.status(404).json({success:false, message:"Item not found"});
    }

    if(quantity === 0){
      user.cartItems = user.cartItems.filter(item => item.id !== productId);
      await user.save();
      return res.status(200).son({success: true, message: "Item removed successfully", data: user.cartItems});
    }

    existingItem.quantity = quantity;
    await user.save();
    return res.status(200).json({success: true, message: "Item updated successfully", data: user.cartItems});
  } catch (error) {
    console .log(`Error in updateItemQuantity controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const createOrder = async (req, res) => {
  const {cart, totalAmount} = req.body;
  const {_id: userId} = req.user;
  try {
    const items = cart.map(item => ({
      productId: item._id,
      quantity: item.quantity,
      price: item.price
    }));
    const newOrder = new Order({userId, items, totalAmount});
    await newOrder.save();
    return res.status(200).json({success: true, message: "Order created successfully", data: newOrder});
  } catch (error) {
    console .log(`Error in createOrder controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}