const express=require('express');
const router=express.Router();
const generateJWT =require("../../helpers/jwtGeneration");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const User=require("../../db/models/userModel");




router.post('/login', async (req,res)=>{
    if(Object.keys(req.body).length === 0){
       return displayCustomError(res,400,false,"there are a missing fields")} 

    else{
        const user =await User.findOne({email:req.body.email})
        if(!user){
            return displayCustomError(res,401,false,"this user is not exist")
        }
        else{
             user.comparePassword(req.body.password,(err,isMatch)=>{
                if(err)
                {
                    return displayError(res,500,false,"Something went Wrong",err)  
                }
                else if (!isMatch) {
                    return displayCustomError(res,401,false,"Password doesn't match");
                }
                else{
                     const token=generateJWT(user).token;
                     return displayData(res,200,true,"User has been successfully login",{user,token}); }})}}
})

router.post('/register',async (req,res)=>{

    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } 
    else{
        try{
          let user = await User.create(req.body)
          return displayData(res,200,true,"User has been successfully added",{user});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}}  
})


module.exports=router;