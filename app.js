const express=require('express');
const app= express();
const authRouter=require('./routes/Auth/auth');
const productRouter=require("./routes/product/product");
const brandRouter=require("./routes/brand/brand");
const categoryRouter=require("./routes/category/category");
const reviewRouter=require("./routes/review/review");
const orderRouter=require("./routes/order/order");
const imageRouter=require("./routes/upload/upload");
const passport=require('passport');
const passport_authenticate_jwt=require('./middleware/authenticate');
const isAdmin=require('./middleware/isAdmin')
const cors= require('cors');
const getStatistics=require("./controller/statistics/statistics");
const fileupload = require("express-fileupload");
require('./db/dbConnection');
require("./passport")(passport);
app.use(cors());

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(fileupload());

app.use('/',authRouter);
app.use('/products',productRouter);
app.use('/brands',brandRouter);
app.use('/categories',categoryRouter);
app.use('/reviews',reviewRouter);
app.use('/orders',orderRouter);
app.use('/images',imageRouter);


app.get('/statistics',passport_authenticate_jwt((req,res,next)=>{next()}),isAdmin,getStatistics)
app.get("*",(Req,res)=>{
    return res.status(404).json({"message":"Not Found"})
})
app.listen((process.env.PORT || 49155),()=>{
    console.log('Server is running to stop the server please press ctrl + c');
})