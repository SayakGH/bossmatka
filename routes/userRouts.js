import express from "express";
import {
    logout, receiveNotifications, singledigit ,jodidigit,singlepatti
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();




router.post("/user/logout", /*authMiddleware*/ logout);

router.post(
  "/auth/receivenotifications",
  /*authMiddleware*/ receiveNotifications
);
router.post("/user/bid/singledigit", singledigit);
router.post("/user/bid/jodidigit", jodidigit);
router.post("/user/bid/singlepatti", singlepatti);


export default router;