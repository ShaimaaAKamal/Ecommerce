const Product=require("../db/models/productModel");

const updateProductByAadding=async(entry)=>{
    const oldproduct=await Product.findById(entry.product)
    if(oldproduct.qty == 0 )
    await Product.updateOne({_id:entry.product},{qty:entry.qty,availability:true})
    else  await Product.updateOne({_id:entry.product},{qty:entry.qty+oldproduct.qty})
    return;
}

const ChangeProductBrandOrCategory=async (mode,fieldId,oldProduct,product,newFieldId) =>{
    let oldData=await mode.findById(fieldId).exec();
    let index=oldData.products.indexOf(oldProduct._id)
    oldData.products.splice(index,1);
    await oldData.save();
    let newData=await mode.findById(newFieldId).populate('products').exec();
    newData.products.push(product);
    await newData.save();
    return;
}


module.exports={updateProductByAadding,ChangeProductBrandOrCategory}