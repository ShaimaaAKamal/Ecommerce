const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addProductController,getProductsController,getSingleProductController,deleteSingleProductController,updateSingleProductController}=require("../../controller/product/productController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,addProductController);
router.get('/',getProductsController);
router.get('/:productId',getSingleProductController);
router.delete('/:productId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,deleteSingleProductController);
router.put('/:productId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,updateSingleProductController);




module.exports=router;