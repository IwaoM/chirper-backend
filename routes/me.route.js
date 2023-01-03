const express = require("express");
const meCtrl = require("../controllers/me.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/profile", auth, meCtrl.setProfile);
router.post("/password", auth, meCtrl.setPassword);
router.post("/theme", auth, meCtrl.setTheme);
router.delete("/", auth, meCtrl.deleteAccount);

module.exports = router;