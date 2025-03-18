require('dotenv').config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql", // Changed from "pg" to "postgresql"
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
