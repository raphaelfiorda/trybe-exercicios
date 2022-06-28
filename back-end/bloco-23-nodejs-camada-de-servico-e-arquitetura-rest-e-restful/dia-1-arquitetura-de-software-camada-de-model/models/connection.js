const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: 'root',
  database: 'bloco23_exercise'
})

module.exports = connection;