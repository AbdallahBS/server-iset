const mongoose = require('mongoose');
const reseauSchema= new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
   
    bg : [
        { img :  {type : String} }
    ],
    parentId: {
        type:String
    }
    

},{timestamps : true});
module.exports = mongoose.model('Reseau',reseauSchema);