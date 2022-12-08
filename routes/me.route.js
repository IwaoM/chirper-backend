const express = require("express");
const meCtrl = require("../controllers/me.controller");

const router = express.Router();

router.post("/profile", meCtrl.setProfile);
router.post("/password", meCtrl.setPassword);
router.post("/theme", meCtrl.setTheme);
router.delete("/", meCtrl.deleteAccount);

module.exports = router;