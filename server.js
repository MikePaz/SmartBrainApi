const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
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

app.get('/profile/:id' ,(req,res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
         found = true;
          return  res.json(user)
        } 
        if(!found) {
            res.status(404).json('User not found')
        }
    })
})


app.post('/signin',(req , res)=>{
    if(req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in')
        }
        
   
})

app.post('/register' , (req,res) =>{
    const {email,name,password} = req.body
    knex('users')
    .returning('*')
    .insert({
        email:email,
        name:name,
        joined: new Date()
    }).then(user =>{
        res.json(user[0])
    }).catch(err=>res.status(400).json(err))

    
})

app.put('/image' ,(req,res)=>{
 
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
         found = true;
         user.entries++
            return  res.json(user.entries)
          
        } 
        if(!found) {
            res.status(404).json('User not found')
        }
    })
})
