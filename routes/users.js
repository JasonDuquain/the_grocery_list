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
        var user = {
            username: req.user.username
        };
        console.log(user); // { username: 'pat' }
        res.send(user);
    }
);

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout();    
        res.send({ message: 'user logging out' })
    } else {
        res.send({ message: 'user is not loggged in' })
    }
});

router.get('/', (req, res, next) => {
    (req.user) ? res.json({ user: req.user }) : res.json({ user: null });
});


module.exports = router;