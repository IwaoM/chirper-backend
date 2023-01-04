const mysql = require("mysql");
const fs = require("node:fs");
const path = require("node:path");
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

connection.connect(async error => {
  if (error) {
    throw error;
  }
  try {
    if (process.argv.length === 3 && process.argv[2].toLowerCase() === "resetdb") {
      const sqlScriptDir = path.join(__dirname, "initDatabase.sql");
      const sqlScript = fs.readFileSync(sqlScriptDir, { encoding:"utf8", flag:"r" });
      await connection.query(sqlScript);
      console.log("Database init script executed");
    } else {
      await connection.query("USE chirper");
      console.log("Database init script skipped");
    }
  } catch (err) {
    console.error("Error when connecting to database");
    throw err;
  }
  console.log("Connection to MySQL ready");
});

module.exports = connection;