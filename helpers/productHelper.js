const Product=require("../db/models/productModel");

const updateProductByAadding=async(entry)=>{
    const oldproduct=await Product.findById(entry.product)
    if(oldproduct.qty == 0 )
    await Product.updateOne({_id:entry.product},{qty:entry.qty,availability:true})
    else  await Product.updateOne({_id:entry.product},{qty:entry.qty+oldproduct.qty})
    return;
}


module.exports={updateProductByAadding}