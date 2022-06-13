const Product=require("../db/models/productModel");
const {displayError}=require("./display");



const upateOrderProducts=async (totalQ,orderPr,products,msg,res)=>{
    let totalQty=totalQ;
    let orderPrice=orderPr;
    let finalCount;
    let nonAvailableProducts=[];
    for (let entry of products){
       const oldproduct=await Product.findById(entry.product)
       finalCount=oldproduct.qty-entry.qty;
       if(finalCount < 0) nonAvailableProducts.push({producId:entry.product , availablePieces:oldproduct.qty, productName:oldproduct.productname})
    }
    if(nonAvailableProducts.length != 0) return {status:false,data:displayError(res,400,false,msg,{nonAvailableProducts})};
    else{
         for(let entry of products){
            totalQty+=entry.qty;
            orderPrice+=entry.qty * entry.price    
            const oldproduct=await Product.findById(entry.product)
            finalCount=oldproduct.qty-entry.qty;
            if(finalCount == 0)
              await Product.updateOne({_id:entry.product},{qty:finalCount,availability:false}) 
            else   await Product.updateOne({_id:entry.product},{qty:finalCount})
         }}
         return {status:true,data:{totalQty,orderPrice}};
}


module.exports=upateOrderProducts