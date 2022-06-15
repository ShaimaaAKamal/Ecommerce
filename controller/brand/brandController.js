const Brand=require("../../db/models/brandModel");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const addBrandController=async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
          let brand = await Brand.create(req.body)
          return displayData(res,200,true,"Brand has been successfully added",{brand});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}} 
}

const getBrandsController=async (req,res) => {
    try{let msg;
        const brands=await Brand.find().populate({path:"products",select:"_id productname"});
        if(brands.length !=0)     msg="brands has been successfully Retreived";
        else  msg ="There are no brands exist"; 
        return displayData(res,200,true,msg,{brands});
    }
    catch(err){
        return displayError(res,500,false,"Something went Wrong",err);
    }}


const getSingleBrandController= async (req,res) =>{
    const id=req.params.brandId;
    try{
        const brand=await Brand.find({_id:id}).populate({path:"products",select:"_id productname"});
        if(brand.length != 0) return displayData(res,200,true,"Brand has been successfully retrieved",{brand});
        else return displayCustomError(res,404,false,"There are no such a brand exist")
    }catch(err){
        console.log(err);
        return displayError(res,500,false,"Something went Wrong",err)
    }}  
    


const deleteSingleBrandController=async (req,res)=>{
       const id=req.params.brandId;
    try{
        const brand=await Brand.findOneAndDelete({_id:id});
        if(brand) return displayData(res,200,true,"Brand has been successfully deleted",{brand});
        else return displayCustomError(res,404,false,"There are no such a brand exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }} 

const updateSingleBrandController=async (req,res) => {
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
        const id=req.params.brandId;
        const brand=await Brand.findOneAndUpdate({_id:id},req.body,{new:true});
        if( brand.length != 0) return displayData(res,200,true,"Brand has been successfully updated",{brand});
        else return displayCustomError(res,404,false,"There is no such a brand exists")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }
}}


module.exports={addBrandController,getBrandsController,getSingleBrandController,deleteSingleBrandController,updateSingleBrandController}