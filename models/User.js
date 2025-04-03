import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Import Sequelize connection instance

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      // validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    expireOtp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt fields
  }
);

export default User;
