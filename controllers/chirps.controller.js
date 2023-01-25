const fs = require("fs");
const path = require("path");
const connection = require("../db");

const imageFolder = path.join(path.dirname(__dirname), "chirpImages");

exports.getAll = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
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

    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
      chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, 
      user.username, user.handle, 
      chirp_star_count_vw.star_count, 
      chirp_reply_count_vw.reply_count 
    FROM 
      chirp 
      JOIN user ON chirp.author_id = user.id 
      JOIN chirp_star_count_vw ON chirp.id = chirp_star_count_vw.id 
      JOIN chirp_reply_count_vw ON chirp.id = chirp_reply_count_vw.id 
    WHERE chirp.id = ${req.params.chirpId}`;

    const result = await connection.query(sqlQuery);
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getOneReplies = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
      chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, 
      user.username, user.handle, 
      chirp_star_count_vw.star_count, 
      chirp_reply_count_vw.reply_count 
    FROM 
      chirp
      JOIN user ON chirp.author_id = user.id 
      JOIN chirp_star_count_vw ON chirp.id = chirp_star_count_vw.id 
      JOIN chirp_reply_count_vw ON chirp.id = chirp_reply_count_vw.id 
    WHERE chirp.reply_to_id = ${req.params.chirpId}
    ORDER BY chirp.timestamp DESC`;

    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getOneImage = (req, res) => {
  try {
    const imagePath = path.join(imageFolder, req.params.chirpId + ".png");

    if (fs.existsSync(imagePath)) {
      res.status(200).sendFile(imagePath);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.search = async (req, res) => {
  try {
    const sqlQuery = `SELECT 
      chirp.id, chirp.timestamp, chirp.text, chirp.image, chirp.author_id, chirp.reply_to_id, 
      user.username, user.handle, 
      chirp_star_count_vw.star_count, 
      chirp_reply_count_vw.reply_count 
    FROM 
      chirp 
      JOIN user ON chirp.author_id = user.id 
      JOIN chirp_star_count_vw ON chirp.id = chirp_star_count_vw.id 
      JOIN chirp_reply_count_vw ON chirp.id = chirp_reply_count_vw.id 
    WHERE chirp.text LIKE '%${req.query.searchText.replace(/%/g, "\\%").replace(/_/g, "\\_")}%'
    ORDER BY chirp.timestamp DESC`;

    const result = await connection.query(sqlQuery);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.postOne = async (req, res) => {
  try {
    const sqlQuery = `INSERT INTO chirp (timestamp, text, image, author_id, reply_to_id)
    VALUES ('${req.body.timestamp}', '${req.body.chirpText.replace(/'/g, "\\'")}', ${req.file ? true : false}, ${req.body.authorId}, ${req.body.replyToId || "null"})`;
    const sqlQuery2 = `SELECT * FROM chirp WHERE timestamp = '${req.body.timestamp}' AND author_id = '${req.body.authorId}'`;

    await connection.query(sqlQuery);
    const result2 = await connection.query(sqlQuery2);

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

exports.starOne = async (req, res) => {
  try {
    const sqlQuery = `SELECT COUNT(*) AS alreadyStarred FROM user_stars_chirp
    WHERE chirp_id = ${req.params.chirpId} AND user_id = ${req.params.userId}`;
    const sqlQuery2a = `DELETE FROM user_stars_chirp WHERE chirp_id = ${req.params.chirpId} AND user_id = ${req.params.userId}`;
    const sqlQuery2b = `INSERT INTO user_stars_chirp (user_id, chirp_id) VALUES (${req.params.userId}, ${req.params.chirpId})`;

    const result = await connection.query(sqlQuery);
    if (result[0].alreadyStarred && !req.body.starred) {
      // delete the star
      await connection.query(sqlQuery2a);
    } else if (!result[0].alreadyStarred && req.body.starred) {
      // add a star
      await connection.query(sqlQuery2b);
    }
    res.status(200).json(req.params.chirpId);
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const sqlQuery = `SELECT image FROM chirp WHERE id = '${req.params.chirpId}'`;
    const sqlQuery2 = `DELETE FROM chirp WHERE id = '${req.params.chirpId}'`;

    const result = await connection.query(sqlQuery);
    const chirpHasImage = parseInt(result[0].image);
    await connection.query(sqlQuery2);

    if (chirpHasImage) {
      // delete the image
      const imageName = req.params.chirpId + ".png";
      fs.unlinkSync(path.join(imageFolder, imageName));
    }

    res.status(200).json(req.params.chirpId);
  } catch (err) {
    res.status(500).json({ err });
  }
};