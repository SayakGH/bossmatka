import express from "express";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
  updatePassword,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/signup", register);

router.post("/forgotpassword/sendotp", sendOtp);
router.post("/forgotpassword/otpverification", verifyOtp);
router.post("/forgotpassword/updatepassword", updatePassword);

export default router;