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


module.exports.displayCustomError=displayCustomError;
module.exports.displayError=displayError;
module.exports.displayData=displayData;