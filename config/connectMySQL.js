const mysql = require('mysql2/promise');


const connectMySQL = async () => {
  const conn = await  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "payroll"
  });
  return conn;
}

module.exports = connectMySQL;