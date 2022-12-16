const connection = require("../db");

exports.getOne = (req, res) => {
  connection.query(`SELECT * FROM user WHERE id = ${req.params.id}`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.getOneChirps = (req, res) => {
  connection.query(`SELECT * FROM chirp WHERE author_id = ${req.params.id} ORDER BY timestamp DESC`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.getOneStars = (req, res) => {
  connection.query(`SELECT * FROM user_stars_chirp JOIN chirp ON user_stars_chirp.chirp_id = chirp.id WHERE user_stars_chirp.user_id = ${req.params.id} ORDER BY chirp.timestamp DESC`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.searchAll = () => {};

exports.searchEmail = (req, res) => {
  connection.query(`SELECT COUNT(*) AS email_taken FROM user WHERE email = '${req.query.email}'`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.searchHandle = (req, res) => {
  connection.query(`SELECT COUNT(*) AS handle_taken FROM user WHERE handle = '${req.query.handle}'`, function (err, result) {
    if (err) {
      res.status(400).json({ err });
    }
    res.status(200).json(result);
  });
};

exports.postOne = () => {};