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

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  }
});

module.exports = upload