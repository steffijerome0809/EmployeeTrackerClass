const mysql = require("mysql");
const util = require("util");
require("dotenv").config();
const connection = mysql.createConnection({
  // host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASSWORD,
  // database: process.env.DB_NAME,

  host: "localhost",

  // Your port
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "Employee_Tracker",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id" + connection.threadId);
});

module.exports = connection;
