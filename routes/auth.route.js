const express = require("express");
const multer = require("multer");
const authCtrl = require("../controllers/auth.controller");

const router = express.Router();
const upload = multer();

router.get("/check-email", authCtrl.checkEmail);
router.get("/check-handle", authCtrl.checkHandle);

router.post("/signup", upload.single("profilePic"), authCtrl.signup);
router.post("/login", upload.none(), authCtrl.login);
router.post("/:userId/update-profile", upload.single("profilePic"), authCtrl.updateProfile);
router.post("/:userId/update-password", upload.none(), authCtrl.updatePassword);

module.exports = router;