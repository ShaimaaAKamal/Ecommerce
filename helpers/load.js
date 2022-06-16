const upload =async (image,imageFolder,s3)=>{
    let extention=(image.name.split("."))[1];
    let result=  await s3.upload({
       Bucket: 'shopifyallimages',
       Key: imageFolder +`/${Date.now()}-shopifyall.${extention}`,
       Body:image.data ,
     }).promise();
     return result}



module.exports=upload;