const Category=require("../../db/models/categoryModel");
const Product=require("../../db/models/productModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addCategoryController=async (req,res) =>{
    if(Object.keys(req.body).length === 0 || !req.body.name){
        return displayCustomError(res,400,false,"You must enter a category name");
    } 
    else{ try{
          let category = await Category.create(req.body)
          return displayData(res,200,true,"Category has been successfully added",{category});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}} 
}

const getCategorysController=async (req,res) => {
    try{let msg;
        const Categorys=await Category.find().populate({path:'products',select:"productname _id brand qty price availability images description"});
        if(Categorys.length !=0)     msg="Categorys has been successfully Retreived";
        else  msg ="There are no Categorys exist"; 
        return displayData(res,200,true,msg,{Categorys});}
    catch(err){return displayError(res,500,false,"Something went Wrong",err);}}


const getSingleCategoryController= async (req,res) =>{
    const id=req.params.categoryId;
    try{
        const category=await Category.findOne({_id:id}).populate({path:'products',select:"productname _id brand qty price availability images description"}).exec();
        if(category) {return displayData(res,200,true,"Category has been successfully retrieved",{category});}
        else return displayCustomError(res,404,false,"There are no such a Category exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    


const deleteSingleCategoryController=async (req,res)=>{
       const id=req.params.categoryId;
    try{ 
        const category=await Category.findById(id).exec();
        if(category) {let products=category.products;
                      for(let product of products){
                          await Product.findOneAndDelete({_id:product._id});
                      }
                      await Category.findOneAndDelete({_id:id});
            return displayData(res,200,true,"Category has been successfully deleted",{category});}
        else return displayCustomError(res,404,false,"There are no such a Category exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }} 

const updateSingleCategoryController=async (req,res) => {
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
        const id=req.params.categoryId;
        const category=await Category.findOneAndUpdate({_id:id},req.body,{new:true});
        if( category.length != 0) return displayData(res,200,true,"Category has been successfully updated",{category});
        else return displayCustomError(res,404,false,"There is no such a Category exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}}


module.exports={addCategoryController,getCategorysController,getSingleCategoryController,deleteSingleCategoryController,updateSingleCategoryController}