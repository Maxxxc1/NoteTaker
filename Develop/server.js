const express = require('express');
const path = require('path');
const uniqid = require('./helper/uniqid');
const app = express();
const notes = require('./db/db.json')
const fs = require('fs');
const PORT = process.env.PORT || 3001;

// middleware (config/setup code)
// these two lines are PARSING the INCOMING request data body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// routes
app.get('/', function(request, response) {
    console.log("Request Object: ", request);

   
    response.sendFile(path.join(__dirname, './public/index.html'))
})
// app.get('/api/notes', function(request, response) {
//     //console.log("Request Object: ", request);
//    fs.readFile("./db/db.json", "utf-8",(err, data) =>{
//     if (err) {
//         console.error(err)
//         response.status(404).json({message: 'Information not found'});
//         return;
//     }
//     const notes = JSON.parse(data)
//     response.send(notes)
//    } )


// })
app.get('/notes', function(request, response) {
    //console.log("Request Object: ", request);
    response.sendFile(path.join(__dirname, './public/notes.html'))
})

app.post('/api/notes' , (req, res) => {
  const {title, text} = req.body;
  if(title, text) {
    const newNote = {
        title, 
        text,
        id: uniqid()
    
    }
    notes.push(newNote)
    const noteString = JSON.stringify(notes)
    console.log(noteString)
  }
})

//app.put()?
///////////////////////


//app.delete()?

// Start our sever listening 
app.listen(PORT,  () => console.log(`Server listening on PORT: ${PORT}`))