const upload = require("../../middleware/upload");
const express = require("express");
const router = express.Router();
const uploadImage=require("../../controller/upload/upload");

router.post("/upload", upload.array("images"), uploadImage );

module.exports = router;