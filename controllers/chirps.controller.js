const connection = require("../db");

exports.getAll = (req, res) => {
  connection.query("SELECT chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, user.username, user.handle, user.picture FROM chirp JOIN user ON chirp.author_id = user.id ORDER BY timestamp DESC", function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json({
      status: "success",
      length: result?.length,
      data: result
    });
  });
};

exports.getOne = (req, res) => {
  connection.query(`SELECT chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, user.username, user.handle, user.picture FROM chirp JOIN user ON chirp.author_id = user.id WHERE chirp.id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json({
      status: "success",
      data: result
    });
  });
};

exports.getOneReplies = (req, res) => {
  connection.query(`SELECT * FROM chirp WHERE reply_to_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json({
      status: "success",
      length: result?.length,
      data: result
    });
  });
};

exports.getOneReplyCount = (req, res) => {
  connection.query(`SELECT COUNT(*) AS replycount FROM chirp WHERE reply_to_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json({
      status: "success",
      data: result
    });
  });
};

exports.getOneStarCount = (req, res) => {
  connection.query(`SELECT COUNT(*) AS starcount FROM user_stars_chirp WHERE chirp_id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json({
      status: "success",
      data: result
    });
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
    }
    res.status(200).json({
      status: "success",
      data: result
    });
  });
};