const getProfile = (req,res,next,db) =>{
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then(user =>{
        if(user.length){
            res.json(user[0])
        } else {
            res.status(400).json('User Not found')
        }
    })
   .catch(err => res.status(400).json('Error Getting User'))
}

module.exports = {getProfile}