
const crypto=require('crypto');
const fs=require('fs');

crypto.generateKeyPair('rsa', {
    modulusLength: 4096,    // options
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  }, (err, publicKey, privateKey) => { // Callback function
         if(!err)
         {
            fs.writeFileSync(__dirname + '/id_rsa_pub.pem',publicKey); 
            fs.writeFileSync(__dirname + '/id_rsa_priv.pem',privateKey);
         }
        //  else
        //  {
        //    console.log("Errr is: ", err);
        //  }
           
    });