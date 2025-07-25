import mongoose from "mongoose";
import User from "../models/user.model.js";

import {generateJWT} from "../utils/generateJWT.js";

const signup = async (req, res) => {
  try { 
    const {name, email, password} = req.body;
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }
    if(password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }
    
    const user = new User({name, email, password});
    await user.save();

    // TODO: generate jwt token and save it in cookies
    const token = generateJWT(user._id, res);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from response
        __v: undefined // Exclude __v from response
      }
    });
  } catch (error) {
    console.error(`Error in signup controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateJWT(user._id, res);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from response
        __v: undefined // Exclude __v from response
      }
    });
  } catch (error) {
    console.error(`Error in login controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(`Error in logout controller: ${error}`);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

const getProfile =  async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { signup, login, logout, getProfile };