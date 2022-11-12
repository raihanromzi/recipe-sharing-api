require('dotenv').config();
const mysql = require('mysql2');

// Planet Scale
module.exports = mysql.createConnection(process.env.DATABASE_URL);
