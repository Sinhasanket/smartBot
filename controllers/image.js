const Clarifai   = require('clarifai'),

//clarifai
var app = new Clarifai.App({
    apiKey: '15a09444d4f748eeb416eb2009d05eab'
   });  

var apiCall = (req,res) =>{
   app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data =>{
        res.json(data)
    })
    .catch(err => res.status(400).json('unable to fetch api'))
}
   
const putImage = (req,res,db) =>{
    const { id } = req.body;
   db('users').where('id', '=', id)
   .increment('entries',1)
   .returning('entries')
   .then(entry =>{
       res.json(entry[0]);
   })
   .catch(err => res.status(400).json('Unbale to get entries'))
}

module.exports = {
    putImage,
    apiCall
}