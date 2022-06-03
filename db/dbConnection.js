const mongoose=require('mongoose');

const username = "Udacity";
const password = "Hossam12345";
const cluster = "ecommerce";
const dbname = "Ecommerce";
mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.vmn8id9.mongodb.net/?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

module.exports=db
// create schema for collections within db


