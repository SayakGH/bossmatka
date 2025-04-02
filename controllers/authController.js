import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

//Resister anew user

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const checkUser = User.findOne({ phone: phone });
  if (checkUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    phone,
    hashedPassword,
  });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

//Login user

const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await User.findOne({ phone: phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

//generate otp
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
const sendOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    const otp = generateOtp();
    const otpExpire = Date.now() + 5 * 60 * 1000; // 5 minutes

    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.otp = otp;
    user.expireOtp = otpExpire;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

//verify otp
const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.expireOtp < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.expireOtp = null;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

export { login, register, sendOtp, verifyOtp };
