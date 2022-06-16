const aws = require('aws-sdk');


const getImage=(keyName)=>{
    const s3=new aws.S3();
    var params = { Bucket: 'shopifyallimages', Key: keyName}; 
    s3.getObject(params, function (err, data) {
        if (err) {
            return false;
        }
          return data;
    });
}


module.exports=getImage;