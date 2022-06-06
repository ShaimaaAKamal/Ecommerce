const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addProductController,getProductController}=require("../../controller/product/productController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,addProductController)
router.get('/',getProductController)





module.exports=router;