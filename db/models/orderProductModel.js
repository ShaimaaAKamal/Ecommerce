const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const orderProductsModelSchema=new Schema({
    qty:{
        type:Number,
        required:[true, "can't be blank"]
    },
    price:{
        type:Number,
        required:[true, "can't be blank"]
    },
    product:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'producModel'
    },
    order:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'orderModel'
    }
    
},{timestamps:true});

orderProductsModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const orderProductsModel=mongoose.model('orderProductsModel',orderProductsModelSchema);


module.exports =orderProductsModel;


