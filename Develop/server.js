const express = require('express');
const path = require('path');
const uniqid = require('./helper/uniqid');
const app = express();
const notes = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const PORT = process.env.PORT || 3001;

// middleware (config/setup code)
// these two lines are PARSING the INCOMING request data body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// routes
app.get('/notes', (req, res) => {
   
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(err)
      response.status(404).json({message:'Definition not found'})
      return; 
      
    } else {
      const note = JSON.parse(data)
      console.log("response: ", note )
      res.send(note)
    
    }
  })
});

app.post('/api/notes' , (req, res) => {
  const {title, text} = req.body;
  if(title, text) {
    const newNote = {
        title, 
        text,
        id: uniqid()
    
    };
    notes.push(newNote)
    const noteString = JSON.stringify(notes)
    console.log('NoteString;', noteString)
    fs.writeFile("./db/db.json", noteString, (err)=> {
      if(err) {
        console.error 
        res.status(500).json('Note cannot be saved') 
      } else {
        console.log(`Note Saved ${newNote.title}`)
        const response = {
        status: "Success",
        body: newNote,
        }
        console.log(response)
        res.status(200).json(response)
      }
    })
  }
})

app.get("*", (req, res) => {
  res.status(404).json({ msg: "No Resource Found"})
})
// Start our sever listening 
app.listen(PORT,  () => console.log(`Server listening on PORT: ${PORT}`))