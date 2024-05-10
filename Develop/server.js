// we need to bring in our libraries
const express = require('express');
const path = require('path');
// we need to create and Intailize an EXPRESS SERVER INSTANCE
const app = express();
const PORT = process.env.PORT || 3001;

// we have some middleware (config/setup code)
// these two lines are PARSING the INCOMING request data body
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

// routes
app.get('/', function(request, response) {
    console.log("Request Object: ", request);

    // what are we responding with (?)
    //response.send("Hi There");
    response.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', function(request, response) {
    //console.log("Request Object: ", request);

    // what are we responding with (?)
    //response.send("Hi There");
    response.sendFile(path.join(__dirname, './public/notes.html'))
})


app.post('/api/notes' , (req, res) => {
    console.log("Request Body: ", req.body);
    console.log("Request Body type: ", typeof req.body);

})

//app.put()

//app.delete()

// Start our sever listening 
app.listen(PORT,  () => console.log(`Server listening on PORT: ${PORT}`))