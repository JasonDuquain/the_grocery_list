const express = require('express');
const router = express.Router()
const User = require('../database/models/user');
const passport = require('../passport');


const request = require('request');

request({
    url: '/',
    json: true
}, (error, response) => {
    console.log(JSON.stringify(response, undefined, 2))
});


router.post('/', (req, res) => {
    
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            console.log(err);
        } else if (user) {
            res.json({error: `already a user with the username: ${req.body.username}`})
        }
        else {
            const newUser = new User({
                username: req.body.username,
                password: req.body.password
            })
            newUser.save((err, user) => {
                if (err) {
                    return res.json(err);
                }
                return res.json(user)
            })
        }
    });
    
});

router.post('/login', function (req, res, next) {
        next()
    },
    passport.authenticate('local'), (req, res) => {
        var userInfo = {
            username: req.user.username
        };
        console.log(userInfo); // { username: 'pat' }
        res.send(userInfo);
    }
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();
        
        console.log(res);
        
        res.send({ message: 'user logging out' })
    } else {
        res.send({ message: 'user is not loggged in' })
    }
});

// for testing only - update or remove later 
/*router.get('/', (req, res) => {
    console.log(res.json())
});*/


module.exports = router;