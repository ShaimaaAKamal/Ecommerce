const express=require('express');
const passport_authenticate_jwt=require('../../middleware/authenticate');

const router=express.Router();
const isAdmin=require('../../middleware/isAdmin')
const {loginController,registerController,profileController,getAllUsersController,forgetPasswordController,resetPasswordController,changePasswordController}=require("../../controller/Auth/auth")


router.post('/login',loginController )

router.post('/register',registerController)

router.get('/profile' , profileController)

router.get('/users',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,getAllUsersController)

router.post('/forgetPassword',forgetPasswordController)
router.post('/resetPassword',resetPasswordController)
router.post('/changePassword',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,changePasswordController)





module.exports=router;