const generateJWT =require("../../helpers/jwtGeneration");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const User=require("../../db/models/userModel");
const passport_authenticate_jwt=require('../../middleware/authenticate');
const {returnUsersDetails}=require("../../helpers/userDisplay");




const loginController = async (req,res)=>{
    if(Object.keys(req.body).length === 0 || !req.body.email || !req.body.password){
       return displayCustomError(res,400,false,"You must enter full credentials")} 

    else{
        try{
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
                     return displayData(res,200,true,"User has been successfully login",{user:returnUsersDetails(user,"login"),token}); }})}
        } catch(err){
            console.log(err);
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
          return displayData(res,200,true,"User has been successfully added",{user:returnUsersDetails(user,"register")});
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err)}}  
}

const profileController = passport_authenticate_jwt((req,res,next)=>{
    const token=req.headers.authorization;
    const user=req.user;
    return displayData(res,200,true,"User has been successfully Retreived",{user:returnUsersDetails(user,"profile"),token});

})

const getAllUsersController= async(req,res)=>{
     try{
         let msg;
         let users;
        if(req.query.status)  users=await User.find({isAdmin:false,status:req.query.status}).populate("orders").populate("reviews");
        else if(req.query.username)  users=await User.find({isAdmin:false,username:req.query.username}).populate("orders").populate("reviews");
        else if (req.query.creationDate) 
            { users=await User.find({created:req.query.creationDate}).populate("orders").populate("reviews");}
        else  users=await User.find({isAdmin:false}).populate("orders").populate("reviews");
        if(users.length != 0 )   msg="Users has been successfully Retreived"; 
        else  msg="There are no users exist";  
        let newUsers=users.map(user=>  returnUsersDetails(user));
        return displayData(res,200,true,msg,{users:newUsers});
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
            let hashpassword=await user.hashPassword(req.body.password);
            await user.updateOne({password:hashpassword});
            let updatedUser=await User.findById(userId).exec();
            return displayData(res,200,true,"Password has been reset",{user:returnUsersDetails(updatedUser)});
        }
            else displayCustomError(res,404,false,"there is no such a user")  ;
        }catch(err){
            return displayError(res,500,false,"Something went Wrong",err);
        }
     }
 }

 const changePasswordController=async(req,res)=>{
    const userId=req.query.userId;
    if(!userId)  return displayCustomError(res,400,false,"UserId doesn't exists");
    else if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"You must enter a password")}  
    else{
        try{
            let user=await User.findById(userId).exec();
            if(user) {
                await user.comparePassword(req.body.oldPassword,async(err,isMatch)=>{
                    if(err)
                    {
                        return displayError(res,500,false,"Something went Wrong",err)  
                    }
                    else if (!isMatch) {
                        return displayCustomError(res,401,false,"Password doesn't match");
                    }
                    else{
                        let hashpassword=await user.hashPassword(req.body.newPassword);
                        await user.updateOne({password:hashpassword});
                        let updatedUser=await User.findById(userId).exec();
                        return displayData(res,200,true,"Password has been changed",{user:returnUsersDetails(updatedUser)});
                          }})
        }
        else displayCustomError(res,404,false,"There is no such a user")  ;
        }catch(err){
            return displayError(res,500,false,"Something went Wrong",err);
        }
    }
}

const updateUserStatus=async (req,res) =>{
    if(Object.keys(req.body).length === 0 ||! req.body.status){
        return displayCustomError(res,400,false,"You must send the new Status");
    } 
else{try{
const id=req.params.userId;
let user = await User.findOneAndUpdate({_id:id},{status:req.body.status},{new:true});
if(user) return displayData(res,200,true,"user has been successfully updated",{user:returnUsersDetails(user)});
else return displayCustomError(res,404,false,"There is no such  user exists")
}catch(err){
return displayError(res,500,false,"Something went Wrong",err)
}
}

}

module.exports={loginController,registerController,profileController,getAllUsersController,forgetPasswordController,resetPasswordController,changePasswordController,updateUserStatus}