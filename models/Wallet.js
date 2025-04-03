import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Import Sequelize connection instance

const Wallet = sequelize.define(
  "Wallet",
  {
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    balance: {
      type: DataTypes.BIGINT, // Use DECIMAL for more precise values
      defaultValue: 0,
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields
  }
);

export default Wallet;