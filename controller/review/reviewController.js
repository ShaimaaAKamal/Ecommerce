const Review=require("../../db/models/reviewModel");
const User=require("../../db/models/userModel");
const Product=require("../../db/models/productModel");


const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addReviewController=async (req,res) =>{
        try{  req.body.user=req.user._id;
            if(Object.keys(req.body).length === 0){
                return displayCustomError(res,400,false,"You must enter review field");}
            else if (req.body.rate || req.body.review){
                let review = await Review.create(req.body);
                if(review) {
                    let user=await User.findById(req.user._id).exec();
                    user.reviews.push(review);
                    await User.updateOne({_id:req.user._id},{reviews:user.reviews});
                    let product=await Product.findById(req.body.product).exec();
                    product.reviews.push(review);
                    await Product.updateOne({_id:req.body.product},{reviews:product.reviews});
                }
          return displayData(res,200,true,"Review has been successfully added",{review}); 
            }
            else  return displayCustomError(res,400,false,"You must enter rate  field");
        }
        catch(err){ return displayError(res,500,false,"Something went Wrong",err)}
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