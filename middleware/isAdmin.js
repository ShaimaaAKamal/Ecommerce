const {displayCustomError}=require('../helpers/display');

const isAdmin=(req,res,next)=>{
        if(req.user.isAdmin) {
          return next()
        }
        else  return displayCustomError(res,403,false,"User is unauthorized");
     }



module.exports=isAdmin