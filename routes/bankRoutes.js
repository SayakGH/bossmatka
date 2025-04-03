import express from "express";
import {
  addBankAccount,
  updateBankAccount,
} from "../controllers/bankController.js";
// import { addBankAccount } from "../controllers/bankController.js";
// import { updateBankAccount } from "../controllers/bankController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/addbank", addBankAccount);
router.post("/user/updatebank", updateBankAccount);

export default router;
