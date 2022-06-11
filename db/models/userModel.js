const mongoose=require('mongoose');
const bcrypt =require("bcryptjs");
const validateEmail=require('../../Validator/EmailValidation')
const validatePassword=require("../../Validator/passwordValidation")
const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR=10;


const Schema=mongoose.Schema;

const userModelSchema=new Schema({
    username:{
        type:String,
        required:[true, "can't be blank"],
        lowercase:true,
        trim:true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email address is required'],
        trim: true,
        unique:true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate: [validatePassword, 'Please fill a valid password'],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        enum:['active','deactive','suspened'],
        default:"active"
    },
    order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'orderModel'
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviewdModel'
    }]
},{timestamps:true});


userModelSchema.plugin(uniqueValidator, {message: 'is already taken.'});

userModelSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
      
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (err) {
      return next(err);
    }
  });

 


  userModelSchema.methods.comparePassword = function(password, done) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return done(err);
        console.log(password);
        console.log(this.password);
        done(null, isMatch);
    });
};


userModelSchema.methods.hashPassword =async function(password) {
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(password, salt);
        return this.password;
      } catch (err) {
        return err;
      }
};

const userModel=mongoose.model('userModel',userModelSchema);


module.exports =userModel;


