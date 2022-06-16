
const {displayCustomError,displayData}=require("../../helpers/display");
const aws = require('aws-sdk');
const { request } = require("express");
const S3_BUCKET = process.env.S3_BUCKET;



const uploadImage=async(req,res)=>{
    const s3=new aws.S3();

    const upload =async (image,imageFolder)=>{
        let extention=(image.name.split("."))[1];
        let result=  await s3.upload({
           Bucket: 'shopifyallimages',
           Key: `${imageFolder}/${Date.now()}-shopifyall.${extention}`,
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
        const uploadedImageFun= async (req)=>{
            let Images=[];
            if (req.files.images.length > 1){ for(let image of req.files.images) {let out = await upload(image); Images.push(out);}}
            else {let out = await upload(req.files.images); Images.push(out)}
            return displayData(res,200,true,"Image has been successfully uploaded",{Images});
            }
        await uploadedImageFun(req);
     }
}

module.exports=uploadImage;