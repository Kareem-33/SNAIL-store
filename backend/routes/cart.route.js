import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { addToCart, clearCart, createOrder, getCartItems, removeFromCart, updateItemQuantity } from '../controllers/cart.controller.js';

const router = express.Router();


router.get("/", protectRoute, getCartItems);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, clearCart);
router.delete("/:id", protectRoute, removeFromCart);
router.patch("/:id", protectRoute, updateItemQuantity);
router.post("/create-order", protectRoute, createOrder)

export default router;