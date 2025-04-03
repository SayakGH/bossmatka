import express from "express";
import {
  login,
  register,
  sendOtp,
  verifyOtp,
  changeaPassword,
  logout,
  receiveNotifications,
  singledigit,
  jodidigit,
  singlepatti
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/signup", register);

router.post("/forgotpassword/sendotp", sendOtp);
router.post("/forgotpassword/otpverification", verifyOtp);

router.post("/forgotpassword/changepassword", changeaPassword);

router.post("/user/logout", /*authMiddleware*/ logout);

router.post(
  "/auth/receivenotifications",
  /*authMiddleware*/ receiveNotifications
);
router.post("/user/bid/singledigit", singledigit);
router.post("/user/bid/jodidigit", jodidigit);
router.post("/user/bid/singlepatti", singlepatti);

export default router;
