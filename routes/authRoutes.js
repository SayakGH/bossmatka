import express from "express";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/signup", register);

router.post("/forgotpassword/sendotp", sendOtp);
router.post("/forgotpassword/otpverification", verifyOtp);

export default router;
