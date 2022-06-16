
const {displayCustomError,displayData}=require("../../helpers/display");
const path=require('path');
const Resize= require("../../helpers/resize");


const uploadImage=async(req,res)=>{
    // if (req.file === undefined)  r
    // const imgUrl = `https://shopifyall.herokuapp.com/images/${req.file.filename}`;
    // return displayData(res,200,true,"Image has been successfullu uploaded",{imgUrl});
    console.log(req.file);
    console.log(req.files);
    console.log(req.body);
    // const imagePath = path.resolve(__dirname, '/public/images');
    // const fileUpload = new Resize(imagePath);
    // console.log(imagePath);
    // if (!req.files) {
    //     return displayCustomError(res,400,false,"Please provide an Image")
    //  }
    // const filename = await fileUpload.save(req.files.buffer);
    // console.log(filename);
    // return displayData(res,200,true,"Image has been successfullu uploaded",{filename});
}

module.exports=uploadImage;