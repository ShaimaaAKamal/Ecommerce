const User=require('../../db/models/userModel');
const Order=require('../../db/models/ordersModel');
const {displayCustomError,displayError,displayData}=require("../../helpers/display");


const getStatistics=async (req,res)=>{
   try{
    let ActiveUsers=await User.countDocuments({status:"active"});
    let dectivatedUsers=await User.countDocuments({status:"deactivated"})
    let pendingOrders=await Order.countDocuments({status:"pending"})
    let inReviewOrders=await Order.countDocuments({status:"in review"})
    let inProgressOrders=await Order.countDocuments({status:"in progress"})
    let onTheWayOrders=await Order.countDocuments({status:"on the way"})
    let deliveredOrders=await Order.countDocuments({status:"delivered"})
    let yourDate =new Date();
    let searchDate=yourDate.toISOString().split('T')[0];
    let toDayOrders=await Order.countDocuments({created:searchDate});
    let firstDate=new Date();
    let lastSevenDate=new Date(firstDate.setDate(firstDate.getDate()-7))
    let totalIncome=0;
    let orders = await Order.find({created:{$lte:searchDate,$gte:lastSevenDate.toISOString().split('T')[0]}});
    orders.forEach(order => totalIncome+=order.orderPrice);
    let newUsers= await User.countDocuments({created:{$lte:searchDate,$gte:lastSevenDate.toISOString().split('T')[0]},isAdmin:false});
    let Statistics={ActiveUsers,dectivatedUsers,pendingOrders,inReviewOrders,inProgressOrders,onTheWayOrders,deliveredOrders,toDayOrders,totalIncome,newUsers}
    return displayData(res,200,true,"Order has been successfully retrieved",{Statistics});
   }
   catch(err){
    return displayError(res,500,false,"Something went Wrong",err)
   }



}

module.exports=getStatistics;