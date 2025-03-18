require('dotenv').config();
const fastify = require('fastify')({ logger: true });
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const cors = require('@fastify/cors');

// Import your schema tables
const { company, office, agent, property, customFieldsDefinition, media } = require('./schema');

// Setup CORS to allow Appsmith to connect
fastify.register(cors, {
  origin: true, // Adjust this for production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
});

// Setup Neon database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is required in environment variables');
  process.exit(1);
}

const client = postgres(connectionString, { ssl: 'require' });
const db = drizzle(client);

// Health check endpoint
fastify.get('/health', async () => {
  return { status: 'healthy' };
});

// Example API endpoints that Appsmith can use
fastify.get('/api/data', async (request, reply) => {
  try {
    // Replace this with your actual table query
    // const result = await db.select().from(yourTable);
    const result = { message: "Configure your data models and queries" };
    return result;
  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Database query failed' });
  }
});

// Add after your other endpoints
fastify.get('/api/db-test', async (request, reply) => {
  try {
    const result = await client`SELECT NOW() as time, current_user as user`;
    return { status: 'connected', result };
  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Database connection failed', message: error.message });
  }
});

// Add after your other endpoints
fastify.get('/api/schema-test', async (request, reply) => {
  try {
    // Assuming you have a schema file with tables defined
    // Replace 'yourTable' with an actual table from your schema
    const results = await db.select().from(yourTable).limit(5);
    return { 
      status: 'success', 
      message: 'Schema is working properly',
      data: results
    };
  } catch (error) {
    fastify.log.error(error);
    return { 
      status: 'error', 
      message: error.message 
    };
  }
});

// Add after your other endpoints
fastify.get('/api/schema-info', async (request, reply) => {
  try {
    // Get table information directly from PostgreSQL
    const tableInfo = await client`
      SELECT table_name, column_name, data_type 
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `;
    return { tables: tableInfo };
  } catch (error) {
    fastify.log.error(error);
    reply.code(500).send({ error: 'Schema introspection failed' });
  }
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 3000, host: '0.0.0.0' });
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();