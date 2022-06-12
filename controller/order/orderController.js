const Order=require("../../db/models/ordersModel");
const Product=require("../../db/models/productModel");


const {displayCustomError,displayError,displayData}=require("../../helpers/display");


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

 const getOrdersController=async (req,res) => {
            try{let msg;
                let orders;
                if(req.user.isAdmin)
                orders=await Order.find().populate('user');
                else    orders=await Order.find({user:req.user._id}).populate('user');
                if(orders.length !=0)     {msg="orders has been successfully Retreived";}
                else  msg ="There are no orders exist"; 
                return displayData(res,200,true,msg,{orders});
            }
            catch(err){
                return displayError(res,500,false,"Something went Wrong",err);
            }}

const getSingleOrderController=async (req,res) =>{
    const id=req.params.orderId;
    try{
        let order=await Order.findOne({_id:id}).populate('user');
        if(order.length != 0) {return displayData(res,200,true,"Order has been successfully retrieved",{order});}
        else return displayCustomError(res,404,false,"There are orders exist")
    }catch(err){
        return displayError(res,500,false,"Something went Wrong",err)
    }}  

const deleteSingleOrderController=async (req,res)=>{
        const id=req.params.orderId;
     try{
         let order;
         if(req.user.isAdmin)
          order=await Order.findOneAndDelete({_id:id}).populate('user');
         else
            { 
              order=await Order.findById(id);
              if(!order)  return displayCustomError(res,404,false,"There are no such a order exist")
              if(!((req.user._id).equals(order.user)))  return displayCustomError(res,401,false,"You are not authorized to perform that action")
              else
              deletedorder = await Order.deleteOne({_id:id});
            }
         if(order)  {
            for(let entry of order.orderProducts){   
                const oldproduct=await Product.findById(entry.product)
                if(oldproduct.qty == 0 )
                await Product.updateOne({_id:entry.product},{qty:entry.qty,availability:true})
                else  await Product.updateOne({_id:entry.product},{qty:entry.qty+oldproduct.qty})
             }
             return displayData(res,200,true,"Order has been successfully deleted",{order});
         }
         else return displayCustomError(res,404,false,"There are no such a order exist")
     }catch(err){
         return displayError(res,500,false,"Something went Wrong",err)
     }} 



module.exports={addOrderController,getSingleOrderController,getOrdersController,deleteSingleOrderController}