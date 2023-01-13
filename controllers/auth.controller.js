const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../db");
const { jwtSecret } = require("../config.json");

const ppFolder = path.join(path.dirname(__dirname), "profilePictures");

exports.checkEmail = async (req, res) => {
  const sqlQuery = `SELECT COUNT(*) AS email_taken FROM user WHERE email = '${req.query.email}' AND id <> '${req.query.userId}'`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.checkHandle = async (req, res) => {
  const sqlQuery = `SELECT COUNT(*) AS handle_taken FROM user WHERE handle = '${req.query.handle}' AND id <> '${req.query.userId}'`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.signup = async (req, res) => {
  try {
    const hashedPw = await bcrypt.hash(req.body.password, 10);
    let sqlQuery = `INSERT INTO user (email, password, username, handle, bio)
VALUES ('${req.body.email.replace(/'/g, "\\'")}', '${hashedPw}', '${req.body.username ? req.body.username.replace(/'/g, "\\'") : req.body.handle}', '${req.body.handle}', '${req.body.bio.replace(/'/g, "\\'")}')`;
    await connection.query(sqlQuery);

    sqlQuery = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    const result2 = await connection.query(sqlQuery);

    if (req.file) {
      // save the profile pic
      const pictureName = result2[0].id + ".png";
      fs.writeFileSync(path.join(ppFolder, pictureName), req.file.buffer);
    }

    res.status(200).json(result2[0].id);
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
          username: result[0].username,
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

exports.updateProfile = async (req, res) => {
  try {
    let sqlQuery = `UPDATE user SET
email = '${req.body.email.replace(/'/g, "\\'")}', 
username = '${req.body.username ? req.body.username.replace(/'/g, "\\'") : req.body.handle}', 
handle = '${req.body.handle}', 
bio = '${req.body.bio.replace(/'/g, "\\'")}'

WHERE id = '${req.params.userId}'`;
    await connection.query(sqlQuery);

    if (!req.body.keepOldProfilePic) {
      // delete the old profile pic & save the new one if there is one
      const pictureName = req.params.userId + ".png";
      if (fs.existsSync(path.join(ppFolder, pictureName))) {
        fs.unlinkSync(path.join(ppFolder, pictureName));
      }
      if (req.file) {
        fs.writeFileSync(path.join(ppFolder, pictureName), req.file.buffer);
      }
    }

    res.status(200).json(req.params.userId);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.updatePassword = async () => {};