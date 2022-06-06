const express=require('express');
const app= express();
const authRouter=require('./routes/Auth/auth');
const productRouter=require("./routes/product/product");
const passport=require('passport');
const cors= require('cors');
require('./db/dbConnection');
require("./passport")(passport);
app.use(cors())

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use('/',authRouter);
app.use('/',productRouter);


app.listen(3000,()=>{
    console.log('Server is running on https://localhost:3000 to stop the server please press ctrl + c');
})