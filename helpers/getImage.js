const aws = require('aws-sdk');


const getImage=async (keyName)=>{
    const s3=new aws.S3();
    let params = { Bucket: 'shopifyallimages', Key: keyName}; 
    const data = await s3.getObject(params).promise()
    if (data.Body) {return data.Body.toString("utf-8") } else { return undefined}
}


module.exports=getImage;