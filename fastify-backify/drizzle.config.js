require('dotenv').config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql", // Should be "dialect" for drizzle-kit
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
