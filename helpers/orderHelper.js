const User=require("../db/models/userModel");


const addOrderToUser= async(user,order)=>{
   try{
    let userAccount=await User.findById(user).exec();
    userAccount.orders.push(order);
    await User.updateOne({_id:user},{orders:userAccount.orders});
    return true;
   }
   catch(err){ return false;   }
}

const adminGetOrders=async(req)=>{
    let query;
    if(req.query.status) query={status:req.query.status};
    else if (req.query.username) {let user =await User.findOne({username:req.query.username});
                                    query={user:user._id};}
    else if (req.query.creationDate)   query={created:req.query.creationDate}
    else  query=null;

    return query;
}

const userGetOrders = (req) => {
    let query;
    if(req.query.status)  query={status:req.query.status,user:req.user._id};
    else if (req.query.creationDate) query={created:req.query.creationDate,user:req.user._id}
    else  query={user:req.user._id};

    return query

}

const displayOrder= (order) =>{
    let orderDetails={};
    Object.keys(order._doc).forEach((key)=>{
        if(key == "createdAt" || key == "updatedAt" || key == "--v" ) return;
        else if (key == "orderProducts") {let products = order.orderProducts;let newProducts=products.map(prod => {return prod.product});
        orderDetails['orderProducts']=newProducts;}
         else orderDetails[key]=order[key];;
       })

       return orderDetails;
}


module.exports ={addOrderToUser,displayOrder,adminGetOrders,userGetOrders};