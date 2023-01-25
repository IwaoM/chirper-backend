const express = require("express");
const multer = require("multer");
const chirpsCtrl = require("../controllers/chirps.controller");
const auth = require("../middleware/auth");

const router = express.Router();
const upload = multer();

router.get("/search", auth, chirpsCtrl.search);
router.get("/", auth, chirpsCtrl.getAll);
router.get("/:chirpId", auth, chirpsCtrl.getOne);
router.get("/:chirpId/replies", auth, chirpsCtrl.getOneReplies);
router.get("/:chirpId/image", auth, chirpsCtrl.getOneImage);

router.post("/", auth, upload.single("image"), chirpsCtrl.postOne);
router.post("/:chirpId/stars/:userId", auth, chirpsCtrl.starOne);

router.delete("/:chirpId", auth, chirpsCtrl.deleteOne);

module.exports = router;