const Review=require("../../db/models/reviewModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addReviewController=async (req,res) =>{
        try{  req.body.user=req.user._id;
          let review = await Review.create(req.body)
          return displayData(res,200,true,"Brand has been successfully added",{review});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}
}




module.exports={addReviewController}