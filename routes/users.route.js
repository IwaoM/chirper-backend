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

router.post("/:userId/profile", auth, upload.single("profilePic"), usersCtrl.updateProfile);
router.post("/:userId/password", auth, upload.none(), usersCtrl.updatePassword);
router.post("/:userId/theme-bg", auth, usersCtrl.updateThemeBg);
router.post("/:userId/theme-accent", auth, usersCtrl.updateThemeAccent);

router.delete("/:userId", auth, usersCtrl.deleteOne);

module.exports = router;