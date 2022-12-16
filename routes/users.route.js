const express = require("express");
const usersCtrl = require("../controllers/users.controller");

const router = express.Router();

router.get("/search-email", usersCtrl.searchEmail);
router.get("/search-handle", usersCtrl.searchHandle);
router.get("/search", usersCtrl.searchAll);
router.get("/:id", usersCtrl.getOne);
router.get("/:id/chirps", usersCtrl.getOneChirps);
router.get("/:id/stars", usersCtrl.getOneStars);

router.post("/", usersCtrl.postOne);

module.exports = router;