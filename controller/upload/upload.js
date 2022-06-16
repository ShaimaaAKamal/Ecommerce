
const {displayCustomError,displayData}=require("../../helpers/display");
// const path=require('path');
// const Resize= require("../../helpers/resize");
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;



const uploadImage=async(req,res)=>{
    const s3=new aws.S3();
    const upload =async (image)=>{
        let extention=(image.name.split("."))[1];
        let result=  await s3.upload({
           Bucket: 'shopifyallimages',
           Key: `Brands/${Date.now()}-shopifyall.${extention}`,
           Body:image.data ,
         }).promise();
         return result
    }

    if (req.files.length == 0 ) {
        return displayCustomError(res,400,false,"Please provide  Images to be uploaded.")
     }
      
    const uploadedImageFun= async (req)=>{
        if (req.files){ for(let image of req.files.images) {let out = upload(image); console.log(out)}}
        else if(req.file) {let out = upload(req.files.images); console.log(out)}
        console.log('done');
        }
    await uploadedImageFun(req);
}

module.exports=uploadImage;