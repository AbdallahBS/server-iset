const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
//const {} = require('../controller/category');

const path = require('path');
const shortid = require('shortid');
const { createReseau,getReseau, getAllReseauFiles } = require('../controller/Reseau');
const storage = multer.diskStorage({
    destination : function(req , file,cb){
        cb(null,path.join(path.dirname(__dirname),'uploads'));
    },
    filename : function(req , file , cb){
        cb(null ,'ETmidou142003'+file.originalname)
    }
})
const upload = multer({storage})
router.post('/reseau/create',upload.array('bg'),createReseau);
router.get('/reseau/getReseau',getReseau);
router.get('/getAllReseauFiles',getAllReseauFiles);
















router.post('/addReseauFile', upload.array('bg'),(req, res) => {
    const name = req.body.name;
    console.log(name);
    //const gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
    //const writeStream = gridfs.openUploadStream('test.dat');
    var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        chunkSizeBytes: 1024,
        bucketName: 'Reseau'
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
  router.post('/getReseauFile',upload.array('bg'), async(req, res) => {
      const name = req.body.name;
      console.log(name)
      var gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          chunkSizeBytes: 1024, 
          bucketName: 'Reseau'
      });
        /* var bucket = new mongodb.GridFSBucket(db, {   
          chunkSizeBytes: 1024,
          bucketName: 'songs'
        }); */
         gridfs.openDownloadStreamByName(`${req.body.name}`).
          pipe(fs.createWriteStream(path.join(path.dirname(__dirname),'uploads',`${req.body.name}`))).
          on('error', function(error) {
              console.log(":::error");
            assert.ifError(error);
          }).
          on('finish', function() {
            console.log('done!');
            res.download(path.join(path.dirname(__dirname), 'uploads', `${req.body.name}`), `${req.body.name}`, function (err) {
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