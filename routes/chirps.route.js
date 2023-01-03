const express = require("express");
const chirpsCtrl = require("../controllers/chirps.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, chirpsCtrl.getAll);
router.get("/:id", auth, chirpsCtrl.getOne);
router.get("/:id/image", auth, chirpsCtrl.getOneImage);
router.get("/:id/replies", auth, chirpsCtrl.getOneReplies);
router.get("/:id/replycount", auth, chirpsCtrl.getOneReplyCount);
router.get("/:id/starcount", auth, chirpsCtrl.getOneStarCount);
router.get("/search", auth, chirpsCtrl.searchAll);

router.post("/", auth, chirpsCtrl.postOne);
router.post("/:id/star", auth, chirpsCtrl.starOne);

router.delete("/:id/star", auth, chirpsCtrl.unstarOne);
router.delete("/:id", auth, chirpsCtrl.deleteOne);

module.exports = router;