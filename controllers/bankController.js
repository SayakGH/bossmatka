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

  const user = await User.findOne({ phone: phone });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const existingBankAccount = await Bank.findOne({ phone: phone });
  if (existingBankAccount) {
    return res.status(400).json({ message: "Bank account already exists" });
  }
  const newBank = new Bank({
    phone: phone,
    accountHolderName: accountHolderName,
    bankName: bankName,
    upi: upi,
    accountNumber: accountNumber,
    branchName: branchName,
    ifscCode: ifscCode,
    gpayNumber: gpayNumber,
    phonePeNumber: phonePeNumber,
    paytmNumber: paytmNumber,
  });
  const wallet = new Wallet({
    phone: phone,
  });

  try {
    await newBank.save();
    await wallet.save();
    res.status(201).json({ message: "Bank details added successfully" });
  } catch (error) {
    console.error("Full error:", error);
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
      name: error.name,
    });
  }
};

//Update bank account details
const updateBankAccount = async (req, res) => {
  const {
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

  const updatedBank = await Bank.findOne({
    accountHolderName: accountHolderName,
  });
  if (!updatedBank) {
    return res.status(404).json({ message: "Bank account not found" });
  }
  updatedBank.accountHolderName = accountHolderName;
  updatedBank.bankName = bankName;
  updatedBank.upi = upi;
  updatedBank.accountNumber = accountNumber;
  updatedBank.branchName = branchName;
  updatedBank.ifscCode = ifscCode;
  updatedBank.gpayNumber = gpayNumber;
  updatedBank.phonePeNumber = phonePeNumber;
  updatedBank.paytmNumber = paytmNumber;

  if (!updatedBank) {
    return res.status(404).json({ message: "Bank account not found" });
  }
  try {
    await updatedBank.save();

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
