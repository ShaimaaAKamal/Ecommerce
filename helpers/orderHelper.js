const User=require("../db/models/userModel");
const Product=require("../db/models/productModel");



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

const checkOrderProductExistence=(oldOrder,prod)=>{
    let data={exists:false,qty:0,price:0};
    for(entry of oldOrder.orderProducts){
        if((entry.product).equals(prod.product)) { 
         data={exists:true,qty:entry.qty,price:entry.price};break; }
    }
    return data;
}

const getUpdatedAndNonAvalibaleOrderProducts=async(data,prod,updatedProducts,nonAvailableProducts)=>{
   try{
    let diffqty=data.qty - prod.qty;
    if(diffqty > 0)
        updatedProducts.push({productId:prod.product,addedQty:diffqty,qty:prod.qty})
    else if(diffqty < 0){
        let product=await Product.findById(prod.product).exec();
        let finalQty=product.qty - (-1 *diffqty);
        if(finalQty < 0 ) nonAvailableProducts.push({producId:prod.product ,availablePieces:product.qty, productName:product.productname});
        else updatedProducts.push({productId:prod.product,finalqty:finalQty,qty:prod.qty,diffqty:(-1*diffqty)})
        }
        return {updatedProducts,nonAvailableProducts}
   }catch(err){return err;} 
}


const minimizeOrder=async (query,updatedValue,oldOrder,entry,product) =>{
 try{
    await Product.updateOne(query,updatedValue); 
    oldOrder.totalQty-= entry.addedQty;
    oldOrder.orderPrice-= entry.addedQty * product.price;  
    return oldOrder;
 }catch(err){return err};
}

const increaseOrder=async(query,updateValue,oldOrder,entry,product)=>{
    try{
        await Product.updateOne(query,updateValue);
       oldOrder.totalQty+= entry.diffqty;
       oldOrder.orderPrice+= entry.diffqty * product.price;
       return oldOrder;
    }catch(err){return err;}
}


module.exports ={addOrderToUser,displayOrder,adminGetOrders,userGetOrders,checkOrderProductExistence,getUpdatedAndNonAvalibaleOrderProducts,increaseOrder,minimizeOrder};