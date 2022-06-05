const express=require('express');
const app= express();
const authRouter=require('./routes/Auth/auth');
const passport=require('passport');
require("./passport")(passport);

app.use('/',authRouter);


app.listen(3000,()=>{
    console.log('Server is running on https://localhost:3000 to stop the server please press ctrl + c');
})