import User from "../models/User.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

//Resister anew user

const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const checkUser = await User.findOne({ phone: phone });
  if (checkUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name: name,
    email: email,
    phone: phone,
    passwordHash: hashedPassword,
  });
  console.log(user);
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
      name: error.name,
    });
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

    const isMatch = await bcrypt.compare(password, user.passwordHash);
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
  const { phone, otp } = req.body;

  try {
    const user = await User.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.expireOtp < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.expireOtp = null;
    user.verified = true;
    await user.save();

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

//update password
const updatePassword = async (req, res) => {
  const { phone, newPassword } = req.body;
  const user = await User.findOne({ phone: phone });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!user.verified) {
    return res.status(400).json({ message: "User not verified" });
  }
  if (!newPassword) {
    return res.status(400).json({ message: "New password is required" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.passwordHash = hashedPassword;
  user.verified = false;
  try {
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
      name: error.name,
    });
  }
};

export { login, register, sendOtp, verifyOtp, updatePassword };
