require('dotenv').config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "pg", // Changed from "postgresql" to "pg"
  // Remove the "driver" field entirely
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
