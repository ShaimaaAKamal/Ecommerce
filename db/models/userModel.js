const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userModelSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    hash:String,
    salt:String
},{timestamps:true});

const userModel=mongoose.model('userModel',userModelSchema);

model.exports =userModel;