const fs = require("fs");
const path = require("path");
const connection = require("../db");

const ppFolder = path.join(path.dirname(__dirname), "profilePictures");

exports.getOne = async (req, res) => {
  const sqlQuery = `SELECT id, email, username, handle, bio, theme_bg, theme_accent
FROM user WHERE id = ${req.params.userId}`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOnePicture = async (req, res) => {
  try {
    const ppPath = path.join(ppFolder, req.params.userId + ".png");
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

exports.getOneChirps = async (req, res) => {
  let sqlQuery = `SELECT 
  chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, 
  user.username, user.handle, 
  chirp_star_count_vw.star_count, 
  chirp_reply_count_vw.reply_count 

FROM 
  chirp 
  JOIN user ON chirp.author_id = user.id 
  JOIN chirp_star_count_vw ON chirp.id = chirp_star_count_vw.id 
  JOIN chirp_reply_count_vw ON chirp.id = chirp_reply_count_vw.id 

WHERE chirp.author_id = ${req.params.userId}
ORDER BY chirp.timestamp DESC`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneStars = async (req, res) => {
  let sqlQuery = `SELECT 
  chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, 
  user.username, user.handle, 
  chirp_star_count_vw.star_count, 
  chirp_reply_count_vw.reply_count 

FROM 
  chirp 
  JOIN user_stars_chirp ON chirp.id = user_stars_chirp.chirp_id
  JOIN user ON chirp.author_id = user.id 
  JOIN chirp_star_count_vw ON chirp.id = chirp_star_count_vw.id 
  JOIN chirp_reply_count_vw ON chirp.id = chirp_reply_count_vw.id 

WHERE user_stars_chirp.user_id = ${req.params.userId}
ORDER BY chirp.timestamp DESC`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneStarIds = async (req, res) => {
  try {
    const result = await connection.query(`SELECT chirp_id FROM user_stars_chirp WHERE user_id = ${req.params.userId}`);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.searchAll = async () => {};