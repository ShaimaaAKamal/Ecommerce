const Review=require("../../db/models/reviewModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addReviewController=async (req,res) =>{
        try{  req.body.user=req.user._id;
          let review = await Review.create(req.body)
          return displayData(res,200,true,"Review has been successfully added",{review});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}
}

const getReviewsController=async (req,res) => {
    try{let msg;
        const reviews=await Review.find({product:req.body.product});
        if(reviews.length !=0)     msg="reviews has been successfully Retreived";
        else  msg ="There are no reviews exist"; 
        return displayData(res,200,true,msg,{reviews});
    }
    catch(err){
        return displayError(res,500,false,"Something went Wrong",err);
    }}




module.exports={addReviewController,getReviewsController}