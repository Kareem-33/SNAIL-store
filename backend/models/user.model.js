import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cartItems: [
    {
      quantity:{
        type: Number,
        default: 1,
      },
      product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
      }
    }
  ],
  role:{
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  }
}, {
  timestamps: true,
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;