const generateJWT =require("../../helpers/jwtGeneration");


const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const User=require("../../db/models/userModel");
const passport_authenticate_jwt=require('../../middleware/authenticate');




const loginController = async (req,res)=>{
    if(Object.keys(req.body).length === 0){
       return displayCustomError(res,400,false,"there are a missing fields")} 

    else{
        try{
            const user =await User.findOne({username:req.body.username})
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
                     return displayData(res,200,true,"User has been successfully login",{user,token}); }})}
        } catch(err){
            return displayError(res,500,false,"Something went Wrong",err)
        }}
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

const getAllUsersController= async(req,res)=>{
     try{
         let msg;
        const users=await User.find({isAdmin:false});
        if(users.length != 0 )   msg="Users has been successfully Retreived"; 
        else  msg="There are no users exist";  
        return displayData(res,200,true,msg,{users});
     }
     catch(err){
        return displayError(res,500,false,"Something went Wrong",err) 
     }
    
 }

 const forgetPasswordController=async (req,res) => {
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"You must enter you email")} 
    else{
         try{
            const user=await User.findOne({email:req.body.email})
            if(!user)   return displayCustomError(res,404,false,"There is no user related to that email");
            else        return displayData(res,200,true,"User is already exist",{user:{email:user.email,status:user.status,_id:user._id}});

         }
         catch(err){
            return displayError(res,500,false,"Something went Wrong",err)
         }        
    }
 }

 const resetPasswordController = async(req,res)=>{
     const userId=req.query.userId;
     if(!userId)  return displayCustomError(res,400,false,"UserId doesn't exists");
     else  if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"You must enter a password")}  
        else{
        try{
            let user=await User.findById(userId).exec();
            if(user) {
            let hashpassword=await user.hashPassword();
            await user.updateOne({password:hashpassword},);
            let updatedUser=await User.findById(userId).exec();
            return displayData(res,200,true,"Password has been reset",{user:updatedUser});
        }
            else displayCustomError(res,404,false,"there is no such a user")  ;
        }catch(err){
            console.log(err);
            return displayError(res,500,false,"Something went Wrong",err);
        }
     }
 }


module.exports={loginController,registerController,profileController,getAllUsersController,forgetPasswordController,resetPasswordController}