const express = require("express");
const usersCtrl = require("../controllers/users.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/search", auth, usersCtrl.searchAll);
router.get("/:userId", auth, usersCtrl.getOne);
router.get("/:userId/picture", auth, usersCtrl.getOnePicture);
router.get("/:userId/chirps", auth, usersCtrl.getOneChirps);
router.get("/:userId/stars", auth, usersCtrl.getOneStars);
router.get("/:userId/star-ids", auth, usersCtrl.getOneStarIds);

module.exports = router;