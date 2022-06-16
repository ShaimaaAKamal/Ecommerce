
const {displayCustomError,displayData,displayError}=require("../../helpers/display");
const Product=require('../../db/models/userModel');
const Category=require('../../db/models/userModel');
const Brand=require('../../db/models/userModel');

const aws = require('aws-sdk');



const uploadImage=async(req,res)=>{
    const s3=new aws.S3();

    const upload =async (image,imageFolder)=>{
        let extention=(image.name.split("."))[1];
        let result=  await s3.upload({
           Bucket: 'shopifyallimages',
           Key: imageFolder +`/${Date.now()}-shopifyall.${extention}`,
           Body:image.data ,
         }).promise();
         return result}
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
                if (req.files.images.length > 1){ for(let image of req.files.images) {let out = await upload(image,req.body.imageFolder); Images.push(out);}}
                else {let out = await upload(req.files.images,req.body.imageFolder); Images.push(out)}
                let newImages=Images.map(image => image.Location)
    
                // if(req.body.imageFolder === "Products"){
                //     result =await Product.findOneAndUpdate({_id:req.body.folderImageId},{images:newImages},{new:true})
                // }
                // else if(req.body.imageFolder === "Brands"){
                //   result =  await Brand.findOneAndUpdate({_id:req.body.folderImageId},{images:newImages},{new:true})
                // }
                // else if(req.body.imageFolder === "Categories"){
                //   result =  await Category.findOneAndUpdate({_id:req.body.folderImageId},{images:newImages},{new:true})
                // }
                // return displayData(res,200,true,"Image has been successfully uploaded",{result});

                }
                  await uploadedImageFun(req);
        }
        catch(err){
            console.log(err);
            return displayError(res,500,false,"Something went Wrong",err)

        }
     }
}

module.exports=uploadImage;