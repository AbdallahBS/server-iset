const express = require('express');
const fs = require('fs');

const { requireSignin, adminMiddleware } = require('../command-middleware');
const {createHeader,getHeader} = require('../controller/header')
const multer = require('multer');
const router = express.Router();
const app= express();
const mongoose = require('mongoose');
var gridModule = express.Router();
const {GridFsStorage} = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:admin@cluster0.7nvvbbc.mongodb.net/ecommerce?retryWrites=true&w=majority';
//const {} = require('../controller/category');
//init stream
let gfs;
conn.once("open",()=>{
    gfs = Grid(conn.db,mongoose.mongo)
    gfs.collection('uploads')

})
//create storag ingine

const path = require('path');
const shortid = require('shortid');
app.use(methodOverride('_method'));
/*const storage = multer.diskStorage({
    destination : function(req , file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'));
    },
    filename : function(req , file , cb){
        cb(null ,shortid.generate()+'-'+file.originalname)
    }
})
const upload = multer({storage})*/
const storage = multer.diskStorage({
    destination : function(req , file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'));
    },
    filename : function(req , file , cb){
        cb(null ,'ETmidou142003'+file.originalname)
    }
})

  
  const upload = multer({ storage });
router.post('/header/create',upload.array('bg'),createHeader);
router.get('/header/getHeader',getHeader);
router.post('/check', upload.array('bg'),(req, res) => {
  const name = req.body.name;
  console.log(name);
  //const gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
  //const writeStream = gridfs.openUploadStream('test.dat');
  var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      chunkSizeBytes: 1024,
      bucketName: 'files'
  });
  

  fs.createReadStream(path.join(path.dirname(__dirname),"uploads",`ETmidou142003${name}.pdf`)).
      pipe(gridfs.openUploadStream(`${name}.pdf`)).
      on('error', function (error) {
          assert.ifError(error);
      }).
      on('finish', function () {
          console.log('done!');
          return res.status(200).json({message : "file uploaded sucessfully !"})
      });
});
router.get('/check', async(req, res) => {
    console.log(req.body.name)
    var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024, 
        bucketName: 'files'

    });
    /* var bucket = new mongodb.GridFSBucket(db, {
        chunkSizeBytes: 1024,
        bucketName: 'songs'
      }); */
      
       gridfs.openDownloadStreamByName(`${req.body.name}.pdf`).
        pipe(fs.createWriteStream(path.join(path.dirname(__dirname),'uploads',`${req.body.name}.pdf`))).
        on('error', function(error) {
            console.log(":::error");
          assert.ifError(error);
        }).
        on('finish', function() {
          console.log('done!');
          res.download(path.join(path.dirname(__dirname), 'uploads', `${req.body.name}.pdf`), `${req.body.name}.pdf`, function (err) {
            if (err) {
              // handle error
              console.log(err);  
            } else {
              // file sent successfully
              console.log('File sent successfully');
            }
          });
         
        });
    
});
 


//router.post('/pack/update',upload.array('packImage'),updatePack);
//router.get('/category/getcategory',getCategorires)
module.exports=router; 