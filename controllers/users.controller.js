const fs = require("fs");
const path = require("path");
const connection = require("../db");

const ppFolder = path.join(path.dirname(__dirname), "profilePictures");

exports.getOne = async () => {};

exports.getOnePicture = async (req, res) => {
  try {
    const ppPath = path.join(ppFolder, req.params.id + ".png");
    if (fs.existsSync(ppPath)) {
      res.sendFile(ppPath);
    } else {
      const defaultPpPath = path.join(ppFolder, "default.png");
      res.sendFile(defaultPpPath);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneChirps = async () => {};

exports.getOneStars = async () => {};

exports.searchAll = async () => {};

exports.searchEmail = async () => {};

exports.searchHandle = async () => {};

exports.signup = async (req, res) => {
  try {
    let sqlQuery = `INSERT INTO user (email, password, username, handle, bio)
VALUES ('${req.body.email}', '${req.body.password}', '${req.body.username ? req.body.username : req.body.handle}', '${req.body.handle}', '${req.body.bio}')`;
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
    res.status(400).json({ err });
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200);
  } catch (err) {
    res.status(400).json({ err });
  }
};