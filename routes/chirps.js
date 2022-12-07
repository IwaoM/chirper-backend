const express = require("express");
const chirpsCtrl = require("../controllers/chirps");

const router = express.Router();

router.get("/", chirpsCtrl.getChirps);

module.exports = router;