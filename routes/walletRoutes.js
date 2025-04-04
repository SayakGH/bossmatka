import {
  addFunds,
  deductFunds,
  getBalance,
  getTransactions,
} from "../controllers/walletController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to add funds to a wallet
router.post("/addfund", authMiddleware, addFunds);
// Route to deduct funds from a wallet
router.post("/withdraw", authMiddleware, deductFunds);
// Route to get the balance of a wallet
router.get("/balance", authMiddleware, getBalance);
// Route to get transaction history of a wallet
router.get("/transactions", authMiddleware, getTransactions);

export default router;
