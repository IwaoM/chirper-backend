const express = require("express");
const mysql = require("mysql");
const fs = require("node:fs");
const path = require("node:path");
const { mysqlUsername, mysqlPassword } = require("./config.json");

//* connect to MySQL
const con = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: mysqlUsername,
  password: mysqlPassword
});

// input script
const sqlScriptDir = path.join(__dirname, "initDatabase.sql");
const sqlScript = fs.readFileSync(sqlScriptDir, { encoding:"utf8", flag:"r" });

con.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected to MySQL");
  con.query(sqlScript, function (err) {
    if (err) {
      throw err;
    }
    console.log("Script executed");
  });
});

//* construct app
const app = express();

// allow requests from any origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use((req, res, next) => {
  res.status(200);
  next();
});

app.use((req, res) => {
  res.json({
    message: "Request received"
  });
});

module.exports = app;