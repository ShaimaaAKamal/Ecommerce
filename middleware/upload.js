// const multer = require("multer");
// const GridFsStorage = require("multer-gridfs-storage");

// const storage = new GridFsStorage({
//     url: process.env.DB,
//     options: { useNewUrlParser: true, useUnifiedTopology: true },
//     file: (req, file) => {
//         const match = ["image/png", "image/jpeg"];

//         if (match.indexOf(file.mimetype) === -1) {
//             const filename = `${Date.now()}-shopify-${file.originalname}`;
//             return filename;
//         }

//         return {
//             bucketName: "photos",
//             filename: `${Date.now()}-shopify-${file.originalname}`,
//         };
//     },
// });

// module.exports = multer({ storage });

const multer = require('multer');

let storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, 'public/images');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , `${Date.now()}-shopify-${file.originalname}`);   
    }
 });

 let upload = multer({ storage: storage , limits : {fileSize : 3000000}});

module.exports = upload