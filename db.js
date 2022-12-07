const mysql = require("mysql");
const { mysqlUsername, mysqlPassword } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const connection = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: mysqlUsername,
  password: mysqlPassword
});

// input script
const sqlScriptDir = path.join(__dirname, "initDatabase.sql");
const sqlScript = fs.readFileSync(sqlScriptDir, { encoding:"utf8", flag:"r" });

connection.connect(error => {
  if (error) {
    throw error;
  }
  connection.query(sqlScript, function (err) {
    if (err) {
      throw err;
    }
    console.log("Database init script executed");
  });
});

module.exports = connection;