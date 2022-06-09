const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const {addReviewController,getReviewsController,getSingleReviewController,deleteSingleReviewController,updateSingleReviewController}=require("../../controller/review/reviewController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),addReviewController);
router.get('/',getReviewsController);
// router.get('/:reviewId',getSingleReviewController);
// router.delete('/:reviewId',passport_authenticate_jwt((req,res,next)=>{next()}),deleteSingleReviewController);
// router.put('/:reviewId',passport_authenticate_jwt((req,res,next)=>{next()}),updateSingleReviewController);




module.exports=router;