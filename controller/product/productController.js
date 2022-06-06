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

const getProductController=async (req,res) => {
    const products=await Product.find();
    if(products)   return displayData(res,200,true,"Products has been successfully Retreived",{products});
    else   return displayCustomError(res,400,false,"There are no products exist")
}

module.exports={addProductController,getProductController}