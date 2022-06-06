const Product=require("../../db/models/productModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addProductController=async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
          let product = await Product.create(req.body)
          return displayData(res,200,true,"product has been successfully added",{product});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}} 
}


module.exports={addProductController}