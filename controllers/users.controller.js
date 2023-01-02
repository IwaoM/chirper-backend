const fs = require("fs");
const path = require("path");
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

exports.postOne = (req, res) => {
  let sqlQuery = `INSERT INTO user (email, password, username, handle, bio)
VALUES ('${req.body.email}', '${req.body.password}', '${req.body.username ? req.body.username : req.body.handle}', '${req.body.handle}', '${req.body.bio}')`;
  connection.query(sqlQuery, function (err) {
    if (err) {
      res.status(400).json({ err });
      return;
    }
    sqlQuery = `SELECT * FROM user WHERE email = '${req.body.email}'`;
    connection.query(sqlQuery, function (err2, result2) {
      if (err2) {
        res.status(400).json({ err2 });
        return;
      }

      if (!req.file) {
        // no profile pic
      } else {
        // save the image
        let ppFolder = path.join(path.dirname(__dirname), "profilePictures");
        const pictureName = result2[0].id + ".png";
        fs.writeFileSync(path.join(ppFolder, pictureName), req.file.buffer);
      }

      res.status(200).json(result2);
    });
  });
};