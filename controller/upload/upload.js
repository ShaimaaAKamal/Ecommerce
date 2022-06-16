
const {displayCustomError,displayData}=require("../../helpers/display");
// const path=require('path');
// const Resize= require("../../helpers/resize");
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

const uploadImage=async(req,res)=>{
    const s3=new aws.S3();
    console.log(req.files);

    const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: req.files[0].name,
        Body:req.files[0] ,
      }).promise()
    console.log(req.body);

     if (!req.files) {
        return displayCustomError(res,400,false,"Please provide  Images to be uploaded.")
     }

   
}

module.exports=uploadImage;