const express = require("express");
const chirpsRoutes = require("./routes/chirps.route");
const usersRoutes = require("./routes/users.route");
const meRoutes = require("./routes/me.route");
const authRoutes = require("./routes/auth.route");

//* construct app
const app = express();

// allow requests from any origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/chirps", chirpsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/me", meRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;