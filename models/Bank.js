import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  accountHolderName: { type: String, required: true },
  bankName: { type: String, required: true },
  upi: { type: String, required: true },
  accountNumber: { type: String, required: true },
  branchName: { type: String, required: true },
  ifscCode: { type: String, required: true },
  gpayNumber: { type: Number, required: true },
  phonePeNumber: { type: Number, required: true },
  paytmNumber: { type: Number, required: true },
});

const Bank = mongoose.model("Bank", bankSchema);
export default Bank;
