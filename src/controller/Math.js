const Math = require("../models/Math")
exports.createMath = (req, res) => {
    let bg = []
    if (req.files.length > 0) {
        bg = req.files.map(file => {
            return { img: file.filename }
        });
    }
    const mathObj = {
        name: req.body.name,
        bg: bg
    }
    if (req.body.parentId) {
        mathObj.parentId = req.body.parentId;
    }
    const math = new Math(mathObj)
    math.save((error, math) => {
        if (math) {
            return res.status(200).json({ message: "math added sucsessfully !" })
        }
        return res.status(400).json({ message: error })
    })

};
exports.getMath = (req, res) => {
    Math.find({}).exec((error, math) => {
        if (math) {
            return res.status(200).json({ math })
        }
        return res.status(400).json({ error })
    })
}
exports.getAllMathFiles = (req, res) => {
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
        const bucket = new GridFSBucket(db, { bucketName: 'Math' });
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