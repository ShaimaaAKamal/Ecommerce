const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const brandModelSchema=new Schema({
    name:{
        type:String,
        required:[true, "can't be blank"],
        lowercase:true,
        trim:true,
        index:true,
        unique:true
    },
    images:[{
        data:Buffer,
        contentType: String
    }],
    products:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'productModel'
    }
    ]
},{timestamps:true});

brandModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const brandModel=mongoose.model('brandModel',brandModelSchema);


module.exports =brandModel;


