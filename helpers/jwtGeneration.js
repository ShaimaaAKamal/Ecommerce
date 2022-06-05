const jsonwebtoken=require('jsonwebtoken');
const fs=require('fs');
const path=require('path');


// console.log(path.resolve(__dirname,'../keys/id_rsa_priv.pem'));
const filePath=path.resolve(__dirname,'../keys/id_rsa_priv.pem');


const PrivKey=fs.readFileSync(filePath,'utf8');

function generateJWT(user) {
    const _id = user._id;
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      iat: Date.now()
    };
  
    const signedToken = jsonwebtoken.sign(payload, PrivKey, { expiresIn: expiresIn, algorithm: 'RS256' });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }
  
  module.exports=generateJWT;

