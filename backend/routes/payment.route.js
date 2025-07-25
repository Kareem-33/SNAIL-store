import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createOrder } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);

export default router;