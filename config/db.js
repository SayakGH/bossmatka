// import { Sequelize } from "sequelize";

// const DATABASE_URL =
//   "postgresql://test_ds3r_user:7ZtH7rM5Ia4DoeVmb5FumlnFuiq55Gj8@dpg-cvn2o37gi27c73bfdsj0-a.ohio-postgres.render.com/test_ds3r";
// const sequelize = new Sequelize(DATABASE_URL, {
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true, // Enable SSL if needed
//       rejectUnauthorized: false, // Only use if Render requires it
//     },
//   },
//   logging: false, // Set to true to see SQL logs
// });

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("✅ MySQL Connected Successfully.");
//   } catch (error) {
//     console.error("❌ Error connecting to MySQL:", error);
//   }
// })();

// export default sequelize;

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

// Create a Sequelize instance for MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // MySQL username
  process.env.DB_PASSWORD, // MySQL password
  {
    host: process.env.DB_HOST || "localhost", // Use "localhost" if running on the same machine
    dialect: "mysql", // Specify MySQL
    port: process.env.DB_PORT || 3307, // MySQL port
    logging: false, // Disable logging (optional)
  }
);

// Test the database connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Error connecting to database:", error);
  }
};

testDBConnection();

export default sequelize;