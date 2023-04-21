const  Reseau  = require("../models/Reseau")
exports.createReseau =(req, res) => {
    let bg =[]
    if(req.files.length>0){
        bg =req.files.map(file=>{
            return {img : file.filename}
        });
    }
    const  reseauObj = {
        name : req.body.name,
        bg :bg
    }
    if(req.body.parentId){
        reseauObj.parentId=req.body.parentId;
    }
   
    
   const reseau  = new Reseau(reseauObj)

    reseau.save((error,reseau)=>{
        if(reseau){
            return res.status(200).json({message : "reseau added sucsessfully !"})

        }
        return res.status(400).json({message : error})
    })

};
exports.getReseau =(req,res)=>{
    Reseau.find({}).exec((error,reseau)=>{
        if(reseau){
            return res.status(200).json({reseau})
        }
        return res.status(400).json({error})
    })
}
exports.getAllReseauFiles = (req, res) => {
    const { GridFSBucket } = require('mongodb');
    const { MongoClient } = require('mongodb');
    const uri = 'mongodb+srv://root:admin@cluster0.7nvvbbc.mongodb.net/ecommerce?retryWrites=true&w=majority';
    const client = MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            return;
        }
        const db = client.db();
        console.log('Connected to database:', db.databaseName);
        // close the database connection when done
        const bucket = new GridFSBucket(db, { bucketName: 'Reseau' });
        bucket.find({}).toArray((error, files) => {
            if (error) {
              console.error('Error retrieving files:', error);
              return res.status(500).send('Internal Server Error');
            }
            // send the files back as a response
            return res.status(200).json({ files });
          });
    });
    
};