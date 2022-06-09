const displayCustomError=(res,code,succ,msg)=>{
    return res.status(code).json({
        success:succ,
        message:msg,
        details:{data:{}}     
    })
}

const displayError=(res,code,succ,msg,err)=>{
    return res.status(code).json({
        success:succ,
        message:msg,
        details:{data:{},error:err}     
       })
}

const  displayData=(res,code,succ,msg,data)=>{
    return res.status(code).json({
        success:succ,
        message:msg,
        details:{data:data,error:{}}     
       })
}

const displayProduct = (product)=>{
    let newProduct={};
     Object.keys(product._doc).forEach((key)=>{
     if(key == "createdAt" || key == "updatedAt") return;
      else if (key == "category") newProduct[key]=product[key].name;
      else newProduct[key]=product[key];
    })
    return newProduct;

}

const displayProducts=(products)=>{
    let newProducts=products.map(entry => displayProduct(entry));
    return newProducts;
}


module.exports.displayCustomError=displayCustomError;
module.exports.displayError=displayError;
module.exports.displayData=displayData;
module.exports.displayProduct=displayProduct;
module.exports.displayProducts=displayProducts;