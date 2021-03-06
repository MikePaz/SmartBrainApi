const clarifai = require('clarifai')


const app = new Clarifai.App({
    apiKey:'8b4cf86076f742de90e0121a6b772abc'
  });

  const handleApiCall = (req , res) => {

  
  app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>{
      res.json(data)
  })
  .catch(err=>res.status(400).json('unable to work with API'))
}

const imageHandler = (req,res,knex)=>{
    
 
    const { id } = req.body;
    knex('users').where('id' , '=' , id)
    .increment('entries' , 1)
    .returning('entries')
    .then(entries =>{
       res.json(entries[0]);
    })
    .catch(err => res.status(400).json(err ,'unable to get entries'))
}

module.exports = {
    imageHandler : imageHandler,
    handleApiCall:handleApiCall
}