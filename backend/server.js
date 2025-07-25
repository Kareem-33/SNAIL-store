import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import productRoute from './routes/product.route.js';
import cartRoute from './routes/cart.route.js';
import couponRoute from './routes/coupon.route.js';
import paymentRoute from './routes/payment.route.js';
import analyticsRoute from './routes/analytics.route.js';
import { connectDB } from './lib/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({limit: "20mb"}));
app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true
  }
));

app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/analytics", analyticsRoute);

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
  connectDB();
});