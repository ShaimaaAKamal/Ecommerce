
const {displayCustomError,displayData,displayError}=require("../../helpers/display");
const Product=require('../../db/models/productModel');
const Category=require('../../db/models/categoryModel');
const Brand=require('../../db/models/brandModel');
ObjectId = require('mongodb').ObjectId;;
const upload=require("../../helpers/load")
const aws = require('aws-sdk');



const uploadImage=async(req,res)=>{
    const s3=new aws.S3();

   
    if (!req.files) {
        return displayCustomError(res,400,false,"Please provide  Images to be uploaded.")
     }
     else if (req.body.length === 0 || !req.body.imageFolder  || !req.body.folderImageId){
        return displayCustomError(res,400,false,"You Select a Folder Id")
     }
     else{
        try{
            const uploadedImageFun= async (req)=>{
                let Images=[];
                let result;
                if (req.files.images.length > 1){ for(let image of req.files.images) {let out = await upload(image,req.body.imageFolder,s3); Images.push(out);}}
                else {let out = await upload(req.files.images,req.body.imageFolder,s3); Images.push(out)}
                let newImages=Images.map(image => image.Location)
                if(req.body.imageFolder === "Products"){
                    result =await Product.findOneAndUpdate({_id:ObjectId(req.body.folderImageId)},{images:newImages},{new:true})
                }
                else if(req.body.imageFolder === "Brands"){
                  result =  await Brand.findOneAndUpdate({_id:req.body.folderImageId},{images:newImages},{new:true})
                }
                else if(req.body.imageFolder === "Categories"){
                  result =  await Category.findOneAndUpdate({_id:req.body.folderImageId},{images:newImages},{new:true})
                }
                if(result)
                return displayData(res,200,true,"Image has been successfully uploaded",{result});
                else 
                return displayCustomError(res,404,false,"There is no such Id");
                }
                  await uploadedImageFun(req);
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)
        }
     }
}

module.exports=uploadImage;