require('dotenv').config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
