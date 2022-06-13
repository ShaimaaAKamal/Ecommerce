const express=require("express");
const router=express.Router();
const passport_authenticate_jwt=require('../../middleware/authenticate');
const isAdmin=require('../../middleware/isAdmin')
const {addOrderController,getOrdersController,getSingleOrderController,deleteSingleOrderController,updateOrderStatusController,updateOrderProductsController}=require("../../controller/order/orderController")



router.post('/',passport_authenticate_jwt((req,res,next)=>{next()}),addOrderController);
router.get('/',passport_authenticate_jwt((req,res,next)=>{next()}),getOrdersController);
router.get('/:orderId',passport_authenticate_jwt((req,res,next)=>{next()}),getSingleOrderController);
router.delete('/:orderId',passport_authenticate_jwt((req,res,next)=>{next()}),deleteSingleOrderController);
router.put('/:orderId/updateStatus',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,updateOrderStatusController);
router.put('/:orderId/updateProducts',passport_authenticate_jwt((req,res,next)=>{next()}),updateOrderProductsController);


updateOrderProductsController


module.exports=router;