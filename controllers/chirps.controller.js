const fs = require("fs");
const path = require("path");
const connection = require("../db");

const imageFolder = path.join(path.dirname(__dirname), "chirpImages");

exports.getAll = async (req, res) => {
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

ORDER BY chirp.timestamp DESC`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOne = async (req, res) => {
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

  WHERE chirp.id = ${req.params.id}`;
  try {
    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneImage = (req, res) => {
  const imagePath = path.join(imageFolder, req.params.id + ".png");
  try {
    if (fs.existsSync(imagePath)) {
      res.status(200).sendFile(imagePath);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneReplies = async () => {};

exports.getOneReplyCount = async (req, res) => {
  try {
    const result = await connection.query(`SELECT COUNT(*) AS replycount FROM chirp WHERE reply_to_id = ${req.params.id}`);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.getOneStarCount = async (req, res) => {
  try {
    const result = await connection.query(`SELECT COUNT(*) AS starcount FROM user_stars_chirp WHERE chirp_id = ${req.params.id}`);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.searchAll = async () => {};

exports.postOne = async () => {};

exports.starOne = async () => {};

exports.unstarOne = async () => {};

exports.deleteOne = async () => {};