const path = require('path');
const dotenv = require('dotenv');

// Load .env from the current directory (since you copied it there)
dotenv.config();

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Change from connectionString to url
    url: process.env.DATABASE_URL,
    ssl: true
  }
};
