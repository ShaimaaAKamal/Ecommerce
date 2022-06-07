const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addBrandController,getBrandsController,getSingleBrandController,deleteSingleBrandController,updateSingleBrandController}=require("../../controller/brand/brandController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,addBrandController);
router.get('/',getBrandsController);
router.get('/:brandId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,getSingleBrandController);
router.delete('/:brandId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,deleteSingleBrandController);
router.put('/:brandId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,updateSingleBrandController);




module.exports=router;