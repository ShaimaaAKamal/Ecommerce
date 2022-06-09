const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const orderModelSchema=new Schema({
    code:{
        type:String,
        required:true,
        index:true,
        unique:true
    },
    totalPrice:{
        type:Number,
        required:true
    },
    totalitems:{
        type:Number,
        required:true  
    },
    status:{
        type:String,
        enum:["processed","shipped","delivered","cancalled"],
        default:"processed"
    },
    shippingAddress:{
       type:String,
       required:true
    },
    billingAddress:{
        type:String,
       required:true
    },
    products:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'producModel'
    }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    }
},{timestamps:true});

orderModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const orderModel=mongoose.model('orderModel',orderModelSchema);

orderModelSchema.pre('save', function(next) {
    this.code =  Date.now().toString(36) + Math.random().toString(36).substr(2);
    next();
  });

module.exports =orderModel;


