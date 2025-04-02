import express from "express";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authMiddleware, login);
router.post("/signup", authMiddleware, register);

router.post("/forgotpassword/sendotp", sendOtp);
router.post("/forgotpassword/otpverification", verifyOtp);

export default router;
