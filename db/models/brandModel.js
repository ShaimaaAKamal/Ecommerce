const mongoose=require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



const Schema=mongoose.Schema;

const brandModelSchema=new Schema({
    name:{
        type:String,
        required:[true, "can't be blank"],
        lowercase:true,
        trim:true,
        index:true
    },
    images:[{
        data:Buffer,
        contentType: String
    }],
    product:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'producModel'
    }
    ]
},{timestamps:true});


const brandModel=mongoose.model('brandModel',brandModelSchema);


module.exports =brandModel;


