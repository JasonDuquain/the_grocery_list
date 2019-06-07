require('dotenv').config() // PUT THIS ON THE FIRST LINE

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const database = require('./database');
const passport = require('./passport');
const MongoStore = require('connect-mongo')(session)

const app = express();
const PORT = process.env.PORT || 8080;


//// Routes
const users = require('./routes/users');
const items = require('./routes/items');

//// express session
app.use(session({
		secret: process.env.SECRET, 
		resave: false, 
		saveUninitialized: false,
        store: new MongoStore({ mongooseConnection: database }),
	})
);

//// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//**** TODO: add a conditional for public/build etc ??
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


//// Routes
app.use('/user', users);
app.use('/items', items);


//****TODO: add a conditional for public/build etc ??
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});



app.listen(PORT, () => {console.log(`App listening on PORT: ${PORT}`)});
