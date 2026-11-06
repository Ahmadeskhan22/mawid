const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = process.env.PORT || 3000;

function createDatabasePool() {
  const requiredVariables = ['DB_HOST', 'DB_USER', 'DB_NAME'];
  const missingVariables = requiredVariables.filter((name) => !process.env[name]);
  if (process.env.DB_PASSWORD === undefined) {
    missingVariables.push('DB_PASSWORD');
  }

  if (missingVariables.length > 0) {
    throw new Error(`Missing required MySQL environment variables: ${missingVariables.join(', ')}`);
  }

  const databasePort = Number(process.env.DB_PORT || 3306);
  if (!Number.isInteger(databasePort) || databasePort < 1 || databasePort > 65535) {
    throw new Error('DB_PORT must be a valid port number.');
  }

  return mysql.createPool({
    host: process.env.DB_HOST,
    port: databasePort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
}

app.get('/', (req, res) => {
  res.send('Hello  Eng.Ahmed');
});
// main router is /
app.get('/about',(req,res)=>{
    res.send('This is the about page');
});

async function startServer() {
  const db = createDatabasePool();

  try {
    await db.query('SELECT 1');
  } catch (error) {
    await db.end();
    throw error;
  }

  app.locals.db = db;
  app.listen(port, () => {
    console.log(`mawid is running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to connect to MySQL; server was not started:', error);
  process.exitCode = 1;
});
