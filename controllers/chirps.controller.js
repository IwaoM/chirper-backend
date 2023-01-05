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

exports.getOneReplies = async (req, res) => {
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

WHERE chirp.reply_to_id = ${req.params.id}

ORDER BY chirp.timestamp DESC`;
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

exports.postOne = async (req, res) => {
  try {
    let sqlQuery = `INSERT INTO chirp (timestamp, text, image, author_id, reply_to_id)
VALUES ('${req.body.timestamp}', '${req.body.chirpText}', ${req.file ? true : false}, ${req.body.authorId}, ${req.body.replyToId || "null"})`;
    await connection.query(sqlQuery);

    sqlQuery = `SELECT * FROM chirp WHERE timestamp = '${req.body.timestamp}' AND author_id = '${req.body.authorId}'`;
    const result2 = await connection.query(sqlQuery);

    if (req.file) {
      // save the image
      const imageName = result2[0].id + ".png";
      fs.writeFileSync(path.join(imageFolder, imageName), req.file.buffer);
    }

    res.status(200).json(result2[0].id);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.starOne = async () => {};

exports.unstarOne = async () => {};

exports.deleteOne = async (req, res) => {
  try {
    let sqlQuery = `DELETE FROM chirp WHERE id = '${req.params.id}'`;
    await connection.query(sqlQuery);
    res.status(200).json(req.params.id);
  } catch (err) {
    res.status(500).json({ err });
  }
};