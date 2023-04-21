const Header = require('../models/Header');
const header = require('../models/Header');

exports.createHeader =(req, res) => {

    const {logo , titre,texte,fburl,insurl,giturl} = req.body
    let bg =[]
    if(req.files.length>0){
        bg =req.files.map(file=>{
            return {img : file.filename}
        });
    }
    const header = new Header({
        logo,titre,texte,fburl,insurl,giturl,bg
    })
    header.save((error,header)=>{
        if(header){
            return res.status(200).json({message : "header added sucsessfully !"})

        }
        return res.status(400).json({message : error})
    })

};
exports.getHeader =(req, res) => {

   Header.find({}).exec((error,header)=>{
    if(header){
        return res.status(200).json({header});
    }
  

})}
