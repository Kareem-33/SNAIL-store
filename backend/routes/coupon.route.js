import express from 'express';
import { adminRoute, protectRoute } from '../middleware/auth.middleware.js';
import { getCoupons, addCoupon, deleteCoupon, validateCoupon } from '../controllers/coupon.controller.js';

const router = express.Router();

router.get("/", protectRoute, adminRoute, getCoupons);
router.post("/", protectRoute, adminRoute, addCoupon)
router.delete("/:id", protectRoute, adminRoute, deleteCoupon)
router.post("/validate", protectRoute, validateCoupon);

export default router;