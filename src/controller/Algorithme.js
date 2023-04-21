const  Algorithme  = require("../models/Algorithme")
exports.createAlgorithme =(req, res) => {
    let bg =[]
    if(req.files.length>0){
        bg =req.files.map(file=>{
            return {img : file.filename}
        });
    }
    const  algorithmeObj = {
        name : req.body.name,
        bg :bg
    }
    if(req.body.parentId){
        algorithmeObj.parentId=req.body.parentId;
    }
   
    
   const reseau  = new Algorithme(algorithmeObj)

    reseau.save((error,algorithme)=>{
        if(algorithme){
            return res.status(200).json({message : "algorithme added sucsessfully !"})

        }
        return res.status(400).json({message : error})
    })

};
exports.getAlgorithme =(req,res)=>{
    Algorithme.find({}).exec((error,algorithme)=>{
        if(algorithme){
            return res.status(200).json({algorithme})
        }
        return res.status(400).json({error})
    })
}
exports.getAllAlgorithmeFiles = (req, res) => {
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
        const bucket = new GridFSBucket(db, { bucketName: 'Algorithme' });
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