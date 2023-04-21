const mongoose = require('mongoose');
const algorithmeSchema= new mongoose.Schema({
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
module.exports = mongoose.model('Algorithme',algorithmeSchema);