const Clarifai   = require('clarifai');

//clarifai
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API
   });  

const apiCall = (req,res) =>{
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