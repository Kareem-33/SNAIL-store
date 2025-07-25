import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized - Token not provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password").select("-__v");
    if (!user) {
      return res.status(404).json({ success: false, message: "Unauthorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in protectRouter middleware: ${error}`);
    res.status(500).json({ success: false, message: "Unauthorized - Invalid or expired token" });
  }
}

export const adminRoute = (req, res, next) => {
  if( req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ success: false, message: "Access denied - Admins only" });
}