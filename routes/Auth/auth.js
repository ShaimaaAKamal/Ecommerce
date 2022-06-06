const express=require('express');
const router=express.Router();
const {loginController,registerController,profileController,getAllUsersController}=require("../../controller/Auth/auth")


router.post('/login',loginController )

router.post('/register',registerController)

router.get('/profile' , profileController)

router.get('/users',getAllUsersController)

module.exports=router;