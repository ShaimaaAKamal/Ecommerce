const Order=require("../../db/models/ordersModel");
const User=require("../../db/models/userModel");
const Product=require("../../db/models/productModel");
const {addOrderToUser,displayOrder,adminGetOrders,userGetOrders}=require("../../helpers/orderHelper");
const {updateProductByAadding}=require("../../helpers/productHelper");
const {displayCustomError,displayError,displayData}=require("../../helpers/display");
const upateOrderProducts=require("../../helpers/updateOrderProducts")


const addOrderController=async (req,res) =>{
    if(Object.keys(req.body).length === 0 || !req.body.shippingAddress || !req.body.billingAddress || !req.body.payment || !req.body.products ){
        return displayCustomError(res,400,false,"You should provide order info like Shipping Address , Billing Adress , Payment Details and Products");
    } else { try{
            const {shippingAddress,billingAddress,payment,products}=req.body;
            const user=req.user._id
                let addedProducts=products.filter(product => product.qty > 0 )
                if(addedProducts.length == 0)  return displayCustomError(res,400,false,"There is no products to be ordered");
                else{ let updateStatus= await   upateOrderProducts(0,0,addedProducts,"Can't place order, some producst are not available",res);
                if(! updateStatus.status) return updateStatus.data;
                const orderData={shippingAddress,billingAddress,payment,user,orderProducts:addedProducts,totalQty:updateStatus.data.totalQty,orderPrice:updateStatus.data.orderPrice};
                const order=await Order.create(orderData);
                if(order && addOrderToUser(user,order) ) return displayData(res,200,true,"order has been successfully placed",{order:displayOrder(order)});}}
        catch(err) {return displayError(res,500,false,"Something went Wrong",err);}}}

 const getOrdersController=async (req,res) => {
            try{let msg,orders,query,newOrders;
                if(req.user.isAdmin) query=await adminGetOrders(req);
                else   query = userGetOrders(req); 
                orders=await Order.find(query,{createdAt:0,updatedAt:0}).populate({path:"user",select:"_id username"});             
                if(orders.length !=0)     {msg="orders has been successfully Retreived"; newOrders=orders.map(order => {return displayOrder(order)})}
                else  {msg ="There are no orders exist"; newOrders=[]}
                return displayData(res,200,true,msg,{orders:newOrders});
            }
            catch(err){
                return displayError(res,500,false,"Something went Wrong",err);
            }}

const getSingleOrderController=async (req,res) =>{
    const id=req.params.orderId;
    try{ let order;
        if(req.user.isAdmin)  query={_id:id}
        else query={_id:id,user:req.user._id}
        order=await Order.findOne(query,{createdAt:0,updatedAt:0}).populate({path:"user",select:"_id username"});
        if(order) {return displayData(res,200,true,"Order has been successfully retrieved",{order:displayOrder(order)});}
        else return displayCustomError(res,404,false,"There are no orders exist")
    }catch(err){
        console.log(err);
        return displayError(res,500,false,"Something went Wrong",err)
    }}  

const deleteSingleOrderController=async (req,res)=>{
        const id=req.params.orderId;
     try{
         let order 
         if(req.user.isAdmin)
          order=await Order.findOneAndDelete({_id:id}).populate({path:"user",select:"_id username"});
         else
            { 
              order=await Order.findById(id);
              if(!order)  return displayCustomError(res,404,false,"There are no such a order exist")
              if(!((req.user._id).equals(order.user)))  return displayCustomError(res,401,false,"You are not authorized to perform that action")
              else
              deletedorder = await Order.deleteOne({_id:id});
            }
         if(order)  {
            for(let entry of order.orderProducts){ await updateProductByAadding(entry);}
             return displayData(res,200,true,"Order has been successfully deleted",{order:displayOrder(order)});}
         else return displayCustomError(res,404,false,"There are no such a order exist")
     }catch(err){
         return displayError(res,500,false,"Something went Wrong",err)
     }} 

  const updateOrderProductsController=async (req,res) => {
        if(Object.keys(req.body).length === 0 || !req.body.products){
            return displayCustomError(res,400,false,"You must send Products");
        } else { try{
            const id=req.params.orderId;
            const oldOrder = await Order.findById(id).exec();
            if(oldOrder) {
                if((req.user._id).equals(oldOrder.user)){ 
                    let nonAvailableProducts=[]
                    let updatedProducts=[];
                   for (prod of req.body.products){
                       {
                           let data={exits:false,qty:0,price:0};

                           for(entry of oldOrder.orderProducts){
                               if((entry.product).equals(prod.product)) { 
                                data={exists:true,qty:entry.qty,price:entry.price};break; }
                           }
                           if(data.exists){
                               let diffqty=data.qty - prod.qty;
                                if(diffqty > 0)
                                    updatedProducts.push({productId:prod.product,addedQty:diffqty,qty:prod.qty})
                                else if(diffqty < 0){
                                    let product=await Product.findById(prod.product).exec();
                                    let finalQty=product.qty - (-1 *diffqty);
                                    if(finalQty < 0 ) nonAvailableProducts.push({producId:prod.product ,availablePieces:product.qty, productName:product.productname});
                                    else updatedProducts.push({productId:prod.product,finalqty:finalQty,qty:prod.qty,diffqty:(-1*diffqty)})
                                    }}
                           else  {  
                               let   product=await Product.findById(prod.product).exec();
                                     let finalQty=product.qty - prod.qty;
                                     if(finalQty < 0 ) nonAvailableProducts.push({producId:prod.product ,availablePieces:product.qty, productName:product.productname});
                                     else updatedProducts.push({productId:prod.product,finalqty:finalQty,qty:prod.qty,diffqty:prod.qty,})}}}
                        if(nonAvailableProducts.length != 0) return displayError(res,400,false,"Cant't update order, some products aren't avilable",{nonAvailableProducts})
                        if(updatedProducts.length == 0 ) return displayCustomError(res,400,false,"There new products to be updated");
                        for(entry of updatedProducts){
                            let product=await Product.findById(entry.productId).exec();
                            if (entry.addedQty) {await Product.updateOne({_id:entry.productId},{qty:(product.qty+entry.addedQty)}); 
                              oldOrder.totalQty-= entry.addedQty;
                              oldOrder.orderPrice-= entry.addedQty * product.price;  
                              }
                         
                              else if (entry.finalqty && entry.finalqty > 0 ){ await Product.updateOne({_id:entry.productId},{qty:entry.finalqty});
                              oldOrder.totalQty+= entry.diffqty;
                              oldOrder.orderPrice+= entry.diffqty * product.price;
                        }
                            
                            else  {await Product.updateOne({_id:entry.productId},{qty:entry.finalqty,availability:false});
                            oldOrder.totalQty+= entry.diffqty;
                            oldOrder.orderPrice+= entry.diffqty * product.price;  
                        }
                        }
                        if(oldOrder.totalQty < 0) oldOrder.totalQty=0;
                        if( oldOrder.orderPrice < 0)  oldOrder.orderPrice=0;
                   let order= await Order.findByIdAndUpdate({_id:id},{orderProducts:req.body.products,totalQty:oldOrder.totalQty,orderPrice:oldOrder.orderPrice},{new:true});
                   return displayData(res,200,true,"Order has been successfully updated",{order});

                    }
             else return displayCustomError(res,401,false,"You are unauthorized to perform that action");}
            else return displayCustomError(res,404,false,"There is no such  order exists")
        }catch(err){
            return displayError(res,500,false,"Something went Wrong",err)
        }
    }}

const updateOrderStatusController=async (req,res)=>{
    if(Object.keys(req.body).length === 0 ||! req.body.status){
                    return displayCustomError(res,400,false,"You must send the new Status");
                } 
    else{try{
        const id=req.params.orderId;
        let order = await Order.findOneAndUpdate({_id:id},{status:req.body.status},{new:true});
        if(order) return displayData(res,200,true,"Order has been successfully updated",{order});
        else return displayCustomError(res,404,false,"There is no such a order exists")
        }catch(err){
            return displayError(res,500,false,"Something went Wrong",err)
        }
    }
}

const addOrderReviewController=async(req,res) =>{
    const id=req.params.orderId;
    let order=await Order.findById(id).exec();
    if((order.user).equals(req.user._id)){
        if(Object.keys(req.body).length === 0 ||! req.body.review){
            return displayCustomError(res,400,false,"You must write a review");
        } 
        else{try{
            if(order.review === req.body.review)  return displayCustomError(res,400,false,"There is nothing to be uodated")
             order = await Order.findOneAndUpdate({_id:id},{review:req.body.review},{new:true});
            if(order) return displayData(res,200,true,"A review has been added to that order",{order});
            else return displayCustomError(res,404,false,"There is no such order exists")
            }catch(err){
                return displayError(res,500,false,"Something went Wrong",err)
            }}}
                 else return displayCustomError(res,403,false,"You are not authorized to perfrom that action")

}

module.exports={addOrderController,getSingleOrderController,getOrdersController,deleteSingleOrderController,updateOrderStatusController,updateOrderProductsController,addOrderReviewController}