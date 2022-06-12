const Order=require("../../db/models/ordersModel");
const Product=require("../../db/models/productModel");


const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const { findByIdAndUpdate } = require("../../db/models/ordersModel");


const addOrderController=async (req,res) =>{
    if(Object.keys(req.body).length === 0){
        return displayCustomError(res,400,false,"there are a missing fields");
    } else{
        try{
            const {shippingAddress,billingAddress,payment,products}=req.body;
            const user=req.user._id
            if(products.length == 0) return displayCustomError(res,400,false,"You must send the order Products");
            else {
            let totalQty=0;
            let orderPrice=0;
            let finalCount;
            let nonAvailableProducts=[];
            for (let entry of products){
               const oldproduct=await Product.findById(entry.product)
               finalCount=oldproduct.qty-entry.qty;
               if(finalCount < 0) nonAvailableProducts.push({producId:entry.product , availablePieces:oldproduct.qty, productName:oldproduct.productname})
            }
            if(nonAvailableProducts.length != 0) return displayError(res,400,false,"Can't place order, some producst are not available",{nonAvailableProducts});
            else{
                 for(let entry of products){
                    totalQty+=entry.qty;
                    orderPrice+=entry.qty * entry.price    
                    const oldproduct=await Product.findById(entry.product)
                    finalCount=oldproduct.qty-entry.qty;
                    if(finalCount == 0)
                      await Product.updateOne({_id:entry.product},{qty:finalCount,availability:false}) 
                    else   await Product.updateOne({_id:entry.product},{qty:finalCount})
                 }
                const orderData={shippingAddress,billingAddress,payment,user,orderProducts:products,totalQty,orderPrice};
                const order=await Order.create(orderData);
                return displayData(res,200,true,"order has been successfully placed",{order});
                 }
            }
        }
        catch(err){
            return displayError(res,500,false,"Something went Wrong",err);
        }}}


module.exports={addOrderController}