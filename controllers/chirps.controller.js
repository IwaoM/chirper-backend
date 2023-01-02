const fs = require("fs");
const path = require("path");
const connection = require("../db");

const imageFolder = path.join(path.dirname(__dirname), "chirpImages");

exports.getAll = (req, res) => {
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
  connection.query(sqlQuery, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

exports.getOne = (req, res) => {
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
  connection.query(sqlQuery, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

exports.getOneImage = (req, res) => {
  const imagePath = path.join(imageFolder, req.params.id + ".png");
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath, function (err) {
      if (err) {
        res.status(400).json({ err });
      }
    });
  } else {
    res.status(200).json(null);
  }
};

exports.getOneReplies = (req, res) => {
  connection.query(`SELECT * FROM chirp WHERE reply_to_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

exports.getOneReplyCount = (req, res) => {
  connection.query(`SELECT COUNT(*) AS replycount FROM chirp WHERE reply_to_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

exports.getOneStarCount = (req, res) => {
  connection.query(`SELECT COUNT(*) AS starcount FROM user_stars_chirp WHERE chirp_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};

// todo once request body structure is set
exports.searchAll = () => {};

// todo once request body structure is set
exports.postOne = () => {};

// todo once authentication is set up
exports.starOne = () => {};

// todo once authentication is set up
exports.unstarOne = () => {};

// todo protect route!
exports.deleteOne = (req, res) => {
  connection.query(`DELETE FROM chirp WHERE chirp_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    res.status(200).json(result);
  });
};