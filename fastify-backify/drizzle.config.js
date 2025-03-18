const path = require('path');
const dotenv = require('dotenv');

// Load .env from the appsmith directory
dotenv.config({ path: path.join(__dirname, '..', 'appsmith', '.env') });

module.exports = {
  schema: "./schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
};
