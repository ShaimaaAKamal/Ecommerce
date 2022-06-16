const mongoose=require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const productModelSchema=new Schema({
    productname:{
        type:String,
        required:[true, "can't be blank"],
        lowercase:true,
        trim:true,
        index:true
    },
    description:{
        type:String,
        lowercase:true,
        trim:true
    },
    price:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    availability:{
        type:Boolean,
        default:true
    },
    images:[{
        type:String
    }],
    category:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryModel'
    },
    brand:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'brandModel'
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviewModel'    }]
},{timestamps:true});


const productModel=mongoose.model('productModel',productModelSchema);


module.exports =productModel;


