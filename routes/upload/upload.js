const express = require("express");
const router = express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')

const uploadImage=require("../../controller/upload/upload");

router.post("/upload",passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,uploadImage );

module.exports = router;