const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const reviewModelSchema=new Schema({
    review:{
        type:String,
        trim:true,
        lowercase:true,
        index:true,
    },
    rate:{
        type:Number,
        default:1
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel',
        required:true    
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'productModel',
        required:true 
    }
},{timestamps:true});

reviewModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const reviewModel=mongoose.model('reviewModel',reviewModelSchema);


module.exports =reviewModel;


