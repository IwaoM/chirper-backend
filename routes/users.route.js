const express = require("express");
const usersCtrl = require("../controllers/users.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/search", auth, usersCtrl.searchAll);
router.get("/:id", auth, usersCtrl.getOne);
router.get("/:id/picture", auth, usersCtrl.getOnePicture);
router.get("/:id/chirps", auth, usersCtrl.getOneChirps);
router.get("/:id/stars", auth, usersCtrl.getOneStars);

module.exports = router;