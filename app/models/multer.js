// const multer =require('multer');
// const {path}=require('path');
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     let pathOrigin= path.basename('../public/products/')
//     cb(null, pathOrigin)
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname + '-' + Date.now())
//   }
// })
 
// var upload = multer({ storage: storage })
// exports.uploadMulter=upload;
var multer = require('multer');
const path =require('path')
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, './public/products'); //hỉnh ảnh sẽ chưa trong folder uploads
       
    },
    filename: (req, file, cb) => {
        cb(null , file.originalname); ;// mặc định sẽ save name của hình ảnh
        // là name gốc, chúng ta có thể rename nó.  
    }
})

var upload = multer({storage:storage}); //save trên local của server khi dùng multer
exports.uploadMulter=upload;