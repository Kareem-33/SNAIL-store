import express from 'express';

import { protectRoute, adminRoute } from '../middleware/auth.middleware.js'
import { 
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProductsByCategory,
  toggleFeaturedStatus
} from '../controllers/product.controller.js';

const router = express.Router();

router.get("/", protectRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", protectRoute, getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedStatus);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;