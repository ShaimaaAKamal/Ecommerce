
const {displayCustomError,displayData}=require("../../helpers/display");
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
         return result}

    if (req.files.length == 0 ) {
        return displayCustomError(res,400,false,"Please provide  Images to be uploaded.")
     }
      
    const uploadedImageFun= async (req)=>{
        let Images=[];
        if (req.files.images.length > 1){ for(let image of req.files.images) {let out = await upload(image); Images.push(out);}}
        else {let out = await upload(req.files.images); Images.push(out)}
        return displayData(res,200,true,"Image has been successfully uploaded",{Images});
        }
    await uploadedImageFun(req);
}

module.exports=uploadImage;