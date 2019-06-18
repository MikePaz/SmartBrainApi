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
    knex.select('*').from('users').where({id}).then(user=>{
        if(user.length) {
            res.json(user[0])
        } else {
            res.status(400).json('not found')
        }
    }).catch(err => res.status(400).json('error getting user'))
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
    knex('users').where('id' , '=' , id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries =>{
       res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})
