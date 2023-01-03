const mysql = require("mysql");
const fs = require("node:fs");
const path = require("node:path");
const readline = require("readline");
const util = require("util");
const { mysqlUsername, mysqlPassword } = require("./config.json");

// Wrapper : the query() & connect() methods are promisified
function createAsyncConnection (config) {
  const connection = mysql.createConnection(config);
  return {
    query (sql, args) {
      return util.promisify(connection.query).call(connection, sql, args);
    },
    connect (callback) {
      return util.promisify(connection.connect).call(connection, callback);
    }
  };
}

const connection = createAsyncConnection({
  multipleStatements: true,
  host: "localhost",
  user: mysqlUsername,
  password: mysqlPassword
});

// input script
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


connection.connect(error => {
  if (error) {
    throw error;
  }
  rl.question("Reset database? (y/n): ", function (answer) {
    if (answer.toLowerCase() === "yes" || answer.toLowerCase() === "y") {
      const sqlScriptDir = path.join(__dirname, "initDatabase.sql");
      const sqlScript = fs.readFileSync(sqlScriptDir, { encoding:"utf8", flag:"r" });
      connection.query(sqlScript, function (err) {
        if (err) {
          throw err;
        }
        console.log("Database init script executed");
      });
    } else {
      connection.query("USE chirper", function (err) {
        if (err) {
          throw err;
        }
        console.log("Database init script skipped");
      });
    }
    rl.close();
    console.log("Connection to MySQL ready");
  });
});

module.exports = connection;