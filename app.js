const express    = require('express');
      bodyParser = require('body-parser'),
      bcrypt     = require('bcrypt-nodejs'),
      cors       = require('cors'),
      knex       = require('knex'),
      register   = require('./controllers/register'),
      signin     = require('./controllers/signin'),
      profile    = require('./controllers/profile'),
      image      = require('./controllers/image'),
      app        = express();

const db = knex({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'sanketsinha',
    password : '',
    database : 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res,next) =>{res.send("APP IS WORKING")})
app.post('/signin', signin.postSignin(db,bcrypt));
app.post('/register',(req,res) => { register.postRegister(req,res,db,bcrypt)} );
app.get('/profile:id', (req,res) => { profile.getProfile(req,res,db)});
app.put('/image', (req,res) => { image.putImage(req,res,db) });
app.post('/imageurl', (req,res) => { image.apiCall(req,res) });

// app.listen(process.env.PORT || 8080, () =>{
//     console.log('server is on..')
// });

app.listen((process.env.PORT || 8080), function(){
  console.log('listening on *:5000');
})