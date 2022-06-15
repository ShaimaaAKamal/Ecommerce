
const returnUsersDetails=(user,index="")=>{
    let userDetails={};
    Object.keys(user._doc).forEach((key)=>{
      if(key == "_id" || key == "status" || key == "orders" || key == "reviews"  || key == "username" || key == "created" || key =="isAdmin" ) userDetails[key]=user[key];
       else return;
     })
    if (index == "login" || index ==" register" || index == "profile" ) {
      userDetails['email']=user['email'];
      userDetails['phone']=user['phone'];

    }
     
   return userDetails;

}


module.exports={returnUsersDetails}