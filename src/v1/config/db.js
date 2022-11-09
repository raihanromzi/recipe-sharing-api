require('dotenv').config();
const mysql = require('mysql2');

module.exports = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// module.exports = mysql.createConnection(process.env.DATABASE_URL);
