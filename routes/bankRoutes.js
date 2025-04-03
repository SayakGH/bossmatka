import express from "express";
import {
  addBankAccount,
  updateBankAccount,
} from "../controllers/bankController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addbank", authMiddleware, addBankAccount);
router.post("/updatebank", authMiddleware, updateBankAccount);

export default router;
