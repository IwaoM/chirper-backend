const express = require("express");
const multer = require("multer");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();
const upload = multer();

router.get("/count-email", authCtrl.searchEmail);
router.get("/count-handle", authCtrl.searchHandle);

router.post("/signup", upload.single("profilePic"), authCtrl.signup);
router.post("/login", upload.none(), authCtrl.login);

module.exports = router;