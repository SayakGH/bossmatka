import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, length: 10, required: true, unique: true },
    passwordHash: { type: String, required: true },
    otp: { type: Number, default: null },
    expireOtp: { type: Date, default: false },
  },
  { timeSramp: true }
);

export default mongoose.model("User", UserSchema);
