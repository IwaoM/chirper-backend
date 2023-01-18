const express = require("express");
const multer = require("multer");
const usersCtrl = require("../controllers/users.controller");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer();

router.get("/search", auth, usersCtrl.searchAll);
router.get("/:userId", auth, usersCtrl.getOne);
router.get("/:userId/picture", auth, usersCtrl.getOnePicture);
router.get("/:userId/chirps", auth, usersCtrl.getOneChirps);
router.get("/:userId/stars", auth, usersCtrl.getOneStars);
router.get("/:userId/star-ids", auth, usersCtrl.getOneStarIds);

router.post("/:userId/profile", upload.single("profilePic"), usersCtrl.updateProfile);
router.post("/:userId/password", upload.none(), usersCtrl.updatePassword);
router.post("/:userId/theme-bg", upload.none(), usersCtrl.updateThemeBg);
router.post("/:userId/theme-accent", upload.none(), usersCtrl.updateThemeAccent);

module.exports = router;