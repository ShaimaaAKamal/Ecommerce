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
    try{let msg;
        const products=await Product.find();
        if(products.length !=0)     msg="Products has been successfully Retreived";
        else  msg ="There are no products exist"; 
        return displayData(res,200,true,msg,{products});
    }
    catch(err){
        return displayError(res,500,false,"Something went Wrong",err);
    }}


const getSingleProductController= async (req,res) =>{
    const id=req.params.productId;
    try{
        const product=await Product.find({_id:id});
        if(product.length != 0) return displayData(res,200,true,"Product has been successfully retrieved",{product});
        else return displayCustomError(res,404,false,"There are no products exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    
const deleteSingleProductController=async (req,res)=>{
       const id=req.params.productId;
    try{
        const product=await Product.findOneAndDelete({_id:id});
        if(product) return displayData(res,200,true,"Product has been successfully deleted",{product});
        else return displayCustomError(res,404,false,"There are no such a product exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }} 

const updateSingleProductController=async (req,res) => {
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
        const id=req.params.productId;
        const product=await Product.findOneAndUpdate({_id:id},req.body,{new:true});
        if(product.length != 0) return displayData(res,200,true,"Product has been successfully updated",{product});
        else return displayCustomError(res,404,false,"There is no such a product exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}}


module.exports={addProductController,getProductsController,getSingleProductController,deleteSingleProductController,updateSingleProductController}