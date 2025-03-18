require('dotenv').config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  driver: "postgresql", // Changed from "dialect" to "driver"
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
