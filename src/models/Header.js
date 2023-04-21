const mongoose = require('mongoose');
const headerSchema= new mongoose.Schema({  
    logo : {
        type : String,
        required : true,
        trim : true
    },

    titre : {
        type : String,
        trim : true
    },
    texte : {
        type : String,
        trim : true
    },
    fburl : {
        type : String,
        trim : true
    },
    insurl : {
        type : String,
        trim : true
    },
    giturl : {
        type : String,
        trim : true
    },
    bg : [
        { img :  {type : String} }
    ],
    updatedAt : Date, 
},{timestamps : true});
module.exports = mongoose.model('Header',headerSchema);