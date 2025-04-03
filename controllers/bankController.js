import User from "../models/User.js";
import Bank from "../models/Bank.js";
import Wallet from "../models/Wallet.js";

// Create a new bank account
const addBankAccount = async (req, res) => {
  const {
    phone,
    accountHolderName,
    bankName,
    upi,
    accountNumber,
    branchName,
    ifscCode,
    gpayNumber,
    phonePeNumber,
    paytmNumber,
  } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ where: { phone } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if bank account already exists
    const existingBankAccount = await Bank.findOne({ where: { phone } });
    if (existingBankAccount) {
      return res.status(400).json({ message: "Bank account already exists" });
    }

    // Create bank and wallet in a transaction
    await Bank.create({
      phone,
      accountHolderName,
      bankName,
      upi,
      accountNumber,
      branchName,
      ifscCode,
      gpayNumber,
      phonePeNumber,
      paytmNumber,
    });

    await Wallet.create({ phone, balance: 0 });

    res.status(201).json({ message: "Bank details added successfully" });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      message: "Error adding bank details",
      error: error.message,
      name: error.name,
    });
  }
};

// Update bank account details
const updateBankAccount = async (req, res) => {
  const {
    phone, // Ensure phone is provided to identify the bank account
    accountHolderName,
    bankName,
    upi,
    accountNumber,
    branchName,
    ifscCode,
    gpayNumber,
    phonePeNumber,
    paytmNumber,
  } = req.body;

  try {
    // Find bank account by phone number
    const bankAccount = await Bank.findOne({ where: { phone } });
    if (!bankAccount) {
      return res.status(404).json({ message: "Bank account not found" });
    }

    // Update bank details
    await bankAccount.update({
      accountHolderName,
      bankName,
      upi,
      accountNumber,
      branchName,
      ifscCode,
      gpayNumber,
      phonePeNumber,
      paytmNumber,
    });

    res.status(200).json({ message: "Bank details updated successfully" });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      message: "Error updating bank details",
      error: error.message,
      name: error.name,
    });
  }
};

export { addBankAccount, updateBankAccount };