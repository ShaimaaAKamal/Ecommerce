const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addCategoryController,getCategorysController,getSingleCategoryController,deleteSingleCategoryController,updateSingleCategoryController}=require("../../controller/category/categoryController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,addCategoryController);
router.get('/',getCategorysController);
router.get('/:categoryId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,getSingleCategoryController);
router.delete('/:categoryId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,deleteSingleCategoryController);
router.put('/:categoryId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,updateSingleCategoryController);




module.exports=router;