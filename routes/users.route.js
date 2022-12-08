const express = require("express");
const usersCtrl = require("../controllers/users.controller");

const router = express.Router();

router.get("/:id", usersCtrl.getOne);
router.get("/:id/chirps", usersCtrl.getOneChirps);
router.get("/:id/stars", usersCtrl.getOneStars);
router.get("/search", usersCtrl.searchAll);

router.post("/", usersCtrl.postOne);

module.exports = router;