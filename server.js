require('dotenv').config() // PUT THIS ON THE FIRST LINE!

// TODO: require jest and request here or if not in the test files

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const database = require('./database') 
const connectMongo = require('connect-mongo')(session)
const path = require('path');

const app = express()
const PORT = process.env.PORT || 8080



// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//**** TODO: add a conditional for public/build etc ??
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



//****TODO: add a conditional for public/build etc ??
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


// Starting Server 
app.listen(PORT, () => {console.log(`App listening on PORT: ${PORT}`)});
