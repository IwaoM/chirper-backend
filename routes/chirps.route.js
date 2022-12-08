const express = require("express");
const chirpsCtrl = require("../controllers/chirps.controller");

const router = express.Router();

router.get("/", chirpsCtrl.getAll);
router.get("/:id", chirpsCtrl.getOne);
router.get("/:id/replies", chirpsCtrl.getOneReplies);
router.get("/:id/replycount", chirpsCtrl.getOneReplyCount);
router.get("/:id/starcount", chirpsCtrl.getOneStarCount);
router.get("/search", chirpsCtrl.searchAll);

router.post("/", chirpsCtrl.postOne);
router.post("/:id/star", chirpsCtrl.starOne);

router.delete("/:id", chirpsCtrl.deleteOne);

module.exports = router;