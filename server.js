require('dotenv').config() // PUT THIS ON THE FIRST LINE!

// TODO: require jest and request here or if not in the test files

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./database') ;

//Needed for multiple users? Test without this and remove if not needed
const connectMongo = require('connect-mongo')(session)

const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;


/*** testing express call from react - working  ***/
app.get('/test', (req, res, data) => {
    res.status(200).send('call from react is working')
})


// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//**** TODO: add a conditional for public/build etc ??
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));



//****TODO: add a conditional for public/build etc ??
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



app.listen(PORT, () => {console.log(`App listening on PORT: ${PORT}`)});
