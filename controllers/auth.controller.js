const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../db");
const { jwtSecret } = require("../config.json");

const ppFolder = path.join(path.dirname(__dirname), "profilePictures");

exports.signup = async (req, res) => {
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    let sqlQuery = `INSERT INTO user (email, password, username, handle, bio)
VALUES ('${req.body.email}', '${hashedPw}', '${req.body.username ? req.body.username : req.body.handle}', '${req.body.handle}', '${req.body.bio}')`;
    const result = await connection.query(sqlQuery);

    if (req.file) {
      // save the profile pic
      sqlQuery = `SELECT * FROM user WHERE email = '${req.body.email}'`;
      const result2 = await connection.query(sqlQuery);
      const pictureName = result2[0].id + ".png";
      fs.writeFileSync(path.join(ppFolder, pictureName), req.file.buffer);
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.login = async (req, res) => {
  try {
    let sqlQuery = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    const result = await connection.query(sqlQuery);
    if (result.length) {
      const validPw = await bcrypt.compare(req.body.password, result[0].password);
      if (validPw) {
        res.status(200).json({
          userId: result[0].id,
          token: jwt.sign(
            { userId: result[0].id },
            jwtSecret,
            { expiresIn: "24h" }
          )
        });
      } else {
        res.status(401).json({ message: "Incorrect credentials" });
      }
    } else {
      res.status(401).json({ message: "Incorrect credentials" });
    }
    res.status(200);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.searchEmail = async (req, res) => {
  try {
    const result = await connection.query(`SELECT COUNT(*) AS email_taken FROM user WHERE email = '${req.query.email}'`);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.searchHandle = async (req, res) => {
  try {
    const result = await connection.query(`SELECT COUNT(*) AS handle_taken FROM user WHERE handle = '${req.query.handle}'`);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};