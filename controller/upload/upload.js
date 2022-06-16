
const {displayCustomError,displayData}=require("../../helpers/display");
// const path=require('path');
// const Resize= require("../../helpers/resize");
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

const uploadImage=async(req,res)=>{
    const s3=new aws.S3();

    if (!req.files) {
        return displayCustomError(res,400,false,"Please provide  Images to be uploaded.")
     }

    const uploadedImageFun= async (req)=>{
        for(image of req.files.images){
            console.log(image);
            await s3.upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: image.name,
                Body:image.data ,
              }).promise()
             
        }
        console.log('done');
    } 
    uploadedImageFun();
}

module.exports=uploadImage;