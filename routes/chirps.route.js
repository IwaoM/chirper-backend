const express = require("express");
const multer = require("multer");
const chirpsCtrl = require("../controllers/chirps.controller");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer();

router.get("/", auth, chirpsCtrl.getAll);
router.get("/:id", auth, chirpsCtrl.getOne);
router.get("/:id/replies", auth, chirpsCtrl.getOneReplies);
router.get("/:id/image", auth, chirpsCtrl.getOneImage);
router.get("/:id/replycount", auth, chirpsCtrl.getOneReplyCount);
router.get("/:id/starcount", auth, chirpsCtrl.getOneStarCount);
router.get("/:id/stars/:userId", auth, chirpsCtrl.getChirpStarredByUser);
router.get("/search", auth, chirpsCtrl.searchAll);

router.post("/", auth, upload.single("image"), chirpsCtrl.postOne);
router.post("/:id/stars/:userId", auth, chirpsCtrl.starOne);

router.delete("/:id", auth, chirpsCtrl.deleteOne);

module.exports = router;