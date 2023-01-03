const express = require("express");
const multer = require("multer");
const usersCtrl = require("../controllers/users.controller");

const router = express.Router();
const upload = multer();

router.get("/search-email", usersCtrl.searchEmail);
router.get("/search-handle", usersCtrl.searchHandle);
router.get("/search", usersCtrl.searchAll);
router.get("/:id", usersCtrl.getOne);
router.get("/:id/picture", usersCtrl.getOnePicture);
router.get("/:id/chirps", usersCtrl.getOneChirps);
router.get("/:id/stars", usersCtrl.getOneStars);

router.post("/signup", upload.single("profilePic"), usersCtrl.signup);
router.post("/login", usersCtrl.login);

module.exports = router;