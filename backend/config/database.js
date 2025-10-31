/* const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'inventory_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

// Test connection
pool.on('connect', () => {
  console.log('Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error de conexión a PostgreSQL:', err);
});

module.exports = pool;

 */

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // importante para Render
  }
});

// Test connection
pool.on('connect', () => {
  console.log('Conectado a PostgreSQL en Render');
});

pool.on('error', (err) => {
  console.error('Error de conexión a PostgreSQL:', err);
});

module.exports = pool;
