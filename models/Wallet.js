import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  phone: { type: Number, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
