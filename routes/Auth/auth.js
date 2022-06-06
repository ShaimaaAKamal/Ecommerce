const express=require('express');
const router=express.Router();
const {loginController,registerController,profileController}=require("../../controller/Auth/auth")

router.post('/login',loginController )

router.post('/register',registerController)

router.get('/profile' , profileController)

module.exports=router;