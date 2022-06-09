const Product=require("../../db/models/productModel");
const Category=require("../../db/models/categoryModel");

const {displayCustomError,displayError,displayData,displayProduct,displayProducts}=require("../../helpers/display");


const addProductController=async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
          let product = await Product.create(req.body);
              let category=await Category.findById(product.category).exec();
              category.products.push(product);
              await category.save();
          
          return displayData(res,200,true,"product has been successfully added",{product});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}} 
}

const getProductsController=async (req,res) => {
    try{let msg;
        let products=await Product.find().populate('category');
        
        if(products.length !=0)     {msg="Products has been successfully Retreived"; products=displayProducts(products);}
        else  msg ="There are no products exist"; 
        return displayData(res,200,true,msg,{products});
    }
    catch(err){
        return displayError(res,500,false,"Something went Wrong",err);
    }}


const getSingleProductController= async (req,res) =>{
    const id=req.params.productId;
    try{
        let product=await Product.findOne({_id:id}).populate('category');
        if(product.length != 0) { let newproduct=displayProduct(product);  return displayData(res,200,true,"Product has been successfully retrieved",{product:newproduct});}
        else return displayCustomError(res,404,false,"There are no products exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    
const deleteSingleProductController=async (req,res)=>{
       const id=req.params.productId;
    try{
        const product=await Product.findOneAndDelete({_id:id}).populate('category');
        if(product) {
            let newproduct=displayProduct(product); 
            return displayData(res,200,true,"Product has been successfully deleted",{product:newproduct});
        }
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
        const oldProduct = await Product.findById(id).exec();
        const product=await Product.findOneAndUpdate({_id:id},req.body,{new:true});
        if(product) {
             if((!(oldProduct.category).equals(product.category))){
                let oldCategory=await Category.findById(oldProduct.category).exec();
                let index=oldCategory.products.indexOf(oldProduct._id)
                oldCategory.products.splice(index,1);
                await oldCategory.save();
                let newCategory=await Category.findById(product.category).populate('products').exec();
                newCategory.products.push(product);
                await newCategory.save();
             }
             let newproduct=displayProduct(product);
             return displayData(res,200,true,"Product has been successfully updated",{product:newproduct});
                    }
        else return displayCustomError(res,404,false,"There is no such a product exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}}

const searchController = async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are no key to search for");
    } 
    else{
        try{
        let products=await Product.find({productname:req.body.productname}).populate('category');
        if(products.length != 0) {products=displayProducts(products); return displayData(res,200,true,"Product has been successfully retreived",{products});}
        else return displayCustomError(res,404,false,"There is no such a product exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}
}


module.exports={addProductController,getProductsController,getSingleProductController,deleteSingleProductController,updateSingleProductController,searchController}