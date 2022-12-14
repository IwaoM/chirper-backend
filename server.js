const https = require("https");
const fs = require("fs");
const app = require("./app");

function normalizePort (val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function errorHandler (err) {
  if (err.syscall !== "listen") {
    throw err;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  if (err.code === "EACCES") {
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
  } else if (err.code === "EADDRINUSE") {
    console.error(`${bind} is already in use`);
    process.exit(1);
  } else {
    throw err;
  }
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

server.listen(process.env.PORT || 3000);