const connection = require("../db");

exports.getChirps = (req, res) => {
  connection.query("SELECT * FROM chirp ORDER BY timestamp DESC", function (err, result) {
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