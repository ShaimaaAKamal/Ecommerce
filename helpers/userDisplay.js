const returnUsersDetails=(user)=>{
    let userDetails={};
    Object.keys(user._doc).forEach((key)=>{
    if(key == "_id" || key == "status" || key == "orders" || key == "reviews"  || key == "username" || key == "created" ) userDetails[key]=user[key];
     else return;
   })
   return userDetails;

}


module.exports={returnUsersDetails}