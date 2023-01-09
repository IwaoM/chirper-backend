const fs = require("fs");
const path = require("path");
const connection = require("../db");

const ppFolder = path.join(path.dirname(__dirname), "profilePictures");

exports.getOne = async (req, res) => {
  const sqlQuery = `SELECT id, email, username, handle, bio, theme_bg, theme_accent
FROM user WHERE id = ${req.params.id}`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

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