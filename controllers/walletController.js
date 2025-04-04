import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";

// Add funds
const addFunds = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { phone: phone } });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.balance += amount;
    await wallet.save();

    // Log the transaction
    await Transaction.create({
      phone: phone,
      type: "credit",
      amount: amount,
    });

    res
      .status(200)
      .json({ message: "Funds added successfully", balance: wallet.balance });
  } catch (error) {
    console.error("Error adding funds:", error);
    res.status(500).json({ message: "Error adding funds" });
  }
};

// Deduct funds
const deductFunds = async (req, res) => {
  const { phone, amount } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { phone: phone } });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    if (wallet.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    wallet.balance -= amount;
    await wallet.save();

    // Log the transaction
    await Transaction.create({
      phone: phone,
      type: "debit",
      amount: amount,
    });

    res
      .status(200)
      .json({
        message: "Funds deducted successfully",
        balance: wallet.balance,
      });
  } catch (error) {
    console.error("Error deducting funds:", error);
    res.status(500).json({ message: "Error deducting funds" });
  }
};

// Get balance
const getBalance = async (req, res) => {
  const { phone } = req.body;

  try {
    const wallet = await Wallet.findOne({ where: { phone: phone } });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ message: "Error fetching balance" });
  }
};

// Get transaction history
const getTransactions = async (req, res) => {
  const { phone } = req.body;

  try {
    const transactions = await Transaction.findAll({
      where: { phone: phone },
      order: [["timestamp", "DESC"]],
    });

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

export { addFunds, deductFunds, getBalance, getTransactions };
