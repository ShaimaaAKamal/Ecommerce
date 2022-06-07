const Category=require("../../db/models/categoryModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addCategoryController=async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
          let Category = await Category.create(req.body)
          return displayData(res,200,true,"Category has been successfully added",{Category});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}} 
}

const getCategorysController=async (req,res) => {
    try{let msg;
        const Categorys=await Category.find();
        if(Categorys.length !=0)     msg="Categorys has been successfully Retreived";
        else  msg ="There are no Categorys exist"; 
        return displayData(res,200,true,msg,{Categorys});
    }
    catch(err){
        return displayError(res,500,false,"Something went Wrong",err);
    }}


const getSingleCategoryController= async (req,res) =>{
    const id=req.params.categoryId;
    try{
        const Category=await Category.find({_id:id});
        if(Category.length != 0) return displayData(res,200,true,"Category has been successfully retrieved",{Category});
        else return displayCustomError(res,404,false,"There are no such a Category exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    


const deleteSingleCategoryController=async (req,res)=>{
       const id=req.params.categoryId;
    try{
        const Category=await Category.findOneAndDelete({_id:id});
        if(Category) return displayData(res,200,true,"Category has been successfully deleted",{Category});
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
        const Category=await Category.findOneAndUpdate({_id:id},req.body,{new:true});
        if( Category.length != 0) return displayData(res,200,true,"Category has been successfully updated",{Category});
        else return displayCustomError(res,404,false,"There is no such a Category exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}}


module.exports={addCategoryController,getCategorysController,getSingleCategoryController,deleteSingleCategoryController,updateSingleCategoryController}