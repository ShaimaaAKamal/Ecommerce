const express=require('express');
const router=express.Router();

router.post('/login',(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            message:"user has been successfully login",
            data:{user}
        })
    }catch{
        res.status(400).json({
            success:false,
            message:"bad reequest",
            data:{}
        })
    }
})


module.exports=router;