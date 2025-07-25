import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

export const generateJWT = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'}); // Token expires in 7 days

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
  });

  return token;
}