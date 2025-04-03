import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Import Sequelize connection instance

const Bank = sequelize.define(
  "Bank",
  {
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      // validate: { isNumeric: true },
    },
    accountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    upi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ifscCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpayNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    phonePeNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    paytmNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export default Bank;
