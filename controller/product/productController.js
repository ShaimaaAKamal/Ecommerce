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

const getProductsController=async (req,res) => {
    const products=await Product.find();
    if(products)   return displayData(res,200,true,"Products has been successfully Retreived",{products});
    else   return displayCustomError(res,400,false,"There are no products exist")
}

const getSingleProductController= async (req,res) =>{
    const id=req.params.productId;
    try{
        const product=await Product.find({_id:id});
        if(product.length != 0) return displayData(res,200,true,"Product has been successfully added",{product});
        else return displayCustomError(res,404,false,"There are no products exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    
const deleteSingleProductController=async (req,res)=>{
       const id=req.params.productId;
    try{
        const product=await Product.findOneAndDelete({_id:id});
        if(product) return displayData(res,200,true,"Product has been successfully deleted",{product});
        else return displayCustomError(res,404,false,"There are no products exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }} 




module.exports={addProductController,getProductsController,getSingleProductController,deleteSingleProductController}