const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addOrderController,getOrdersController,getSingleOrderController,deleteSingleOrderController,updateSingleOrderController}=require("../../controller/order/orderController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),addOrderController);
router.get('/',passport_authenticate_jwt((req,res,next)=>{next()}),getOrdersController);
router.get('/:orderId',passport_authenticate_jwt((req,res,next)=>{next()}),getSingleOrderController);
router.delete('/:orderId',passport_authenticate_jwt((req,res,next)=>{next()}),deleteSingleOrderController);
// router.put('/:OrderId',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,updateSingleOrderController);
// router.post('/search',searchController);





module.exports=router;