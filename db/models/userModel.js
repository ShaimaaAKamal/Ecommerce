const mongoose=require('mongoose');
const bcrypt =require("bcryptjs");
const validateEmail=require('../../Validator/EmailValidation')
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
        index:true
    },
    email:{
        type:String,
        required:[true,'Email address is required'],
        trim: true,
        unique:true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
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
        done(null, isMatch);
    });
};

const userModel=mongoose.model('userModel',userModelSchema);


module.exports =userModel;


