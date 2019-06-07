/*** http://www.passportjs.org/docs/ ***/

const passport = require('passport');
const localStrategy = require('./localStrategy');
const User = require('../database/models/user');


passport.serializeUser((user, done) => {
	done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
    
    //***** is a conditional needed to account for an err??
	User.findOne({ _id: id }, (err, user) => {
        done(null, user);
	})
});


// Strategies - **add Google Auth if time permits  
passport.use(localStrategy);




module.exports = passport;