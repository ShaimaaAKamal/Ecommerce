const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const orderModelSchema=new Schema({
    code:{
        type:String,
        index:true,
        unique:true
    },
    status:{
        type:String,
        enum:["processed","shipped","delivered","cancalled"],
        default:"processed"
    },
    payment:{
         type:String,
         Required:true,
         enum:["Cash on delivery" , "Master Card"]
    },
    shippingAddress:{
       type:String,
       required:true
    },
    billingAddress:{
        type:String,
       required:true
    },
    totalQty:{
        type:Number,
        required:true
    },
    orderPrice:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    orderProducts:[{
        product: { type:mongoose.Schema.Types.ObjectId,
        ref:'producttModel',
        required:true} ,
        price:{type:Number,required:true},
        qty:{type:Number,required:true}
    }],
},{timestamps:true});

orderModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});
orderModelSchema.pre('save', function(next) {
    this.code =  Date.now().toString(36) + Math.random().toString(36).substr(2);
    next();
  });

//   orderProducts:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'orderProductsModel'
// }],

const orderModel=mongoose.model('orderModel',orderModelSchema);



module.exports =orderModel;


