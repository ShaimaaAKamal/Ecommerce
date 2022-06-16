const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const categoryModelSchema=new Schema({
    name:{
        type:String,
        required:[true, "can't be blank"],
        lowercase:true,
        trim:true,
        index:true,
        unique:true
    },
    images:[{
        type:String
    }],
    products:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'productModel'
    }
    ]
},{timestamps:true});

categoryModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});


const categoryModel=mongoose.model('categoryModel',categoryModelSchema);


module.exports =categoryModel;


