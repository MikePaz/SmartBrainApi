const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'root',
      database : 'SmartBrain'
    }
  });

const app = express();
app.use(bodyParser.json())
app.use(cors());


app.get('/' , (req , res)=>{
    res.send(database.users)
})

app.listen(3000,()=>{
    console.log('app is running on port 3000')
})

app.get('/profile/:id' ,(req , res) => {profile.handleProfileGet(req,res,knex)})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,knex,bcrypt)})
app.post('/register' , (req , res) => {register.handleRegister(req,res,knex,bcrypt)} )
app.put('/image' ,(req,res) => {Image.imageHandler(req , res , knex)})
