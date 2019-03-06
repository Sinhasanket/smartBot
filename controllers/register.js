const postRegister = (req,res,db,bcrypt) =>{
    const { email, name, password } = req.body;
    if(!email || !name || !password){
        return res.status(400).json('incorrect input')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx =>{
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(mail =>{
           return trx('users')
           .returning('*')
           .insert({
               email:mail[0],
               name:name,
               joined: new Date()
           })
           .then(user =>{
              res.json(user[0]);
           })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
   }

   module.exports = {
       postRegister: postRegister
   }