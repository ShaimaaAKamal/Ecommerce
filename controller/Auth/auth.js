const generateJWT =require("../../helpers/jwtGeneration");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const User=require("../../db/models/userModel");
const passport_authenticate_jwt=require('../../middleware/authenticate');




const loginController = async (req,res)=>{
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
}

const registerController= async (req,res)=>{

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
}

const profileController = passport_authenticate_jwt((req,res,next)=>{
    const token=req.headers.authorization;
    const user=req.user;
    return displayData(res,200,true,"User has been successfully Retreived",{user,token});

})

// const getAllUsersController= passport_authenticate_jwt(async(req,res,next)=>{
//    if(req.user.isAdmin) {
//       const users=await User.find({isAdmin:false});
//       if(users)   return displayData(res,200,true,"Users has been successfully Retreived",{users});
//       else   return displayCustomError(res,401,false,"There are no users exist")
//    }
//    else  return displayCustomError(res,403,false,"User is unauthorized");
// })

const getAllUsersController= async(req,res)=>{
       const users=await User.find({isAdmin:false});
       if(users)   return displayData(res,200,true,"Users has been successfully Retreived",{users});
       else   return displayCustomError(res,401,false,"There are no users exist")
    
 }


module.exports={loginController,registerController,profileController,getAllUsersController}