const express = require('express');
const router = express.Router()
const User = require('../database/models/user');
const passport = require('../passport');

/*** FOR TESTING POPULATE ONLY  ***/
/*

router.post('/hay', (req, res) => {
    User.findOne({ username: req.body.username })
    .populate('items').exec((err, items) => {
      console.log("Populated User " + items);
    })
});

*/




router.post('/', (req, res) => {
    
    User.findOne({ username: req.body.username })
        .then(user => {
            
            if (user) {
                console.log('already a user with this username')
                res.status(400).json({ error: `already a user with the username: ${req.body.username}` })
            } else {
                
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                })
                
                newUser.save()
                .then(user => {
                    res.status(201).json({message: "User created"});
                })
                .catch(err => {
                    res.status(500).json({error: err});
                })
            }
            
        })
        .catch(err => {
            res.status(500).json({ error: "fail on user save" })
        })
    
});

router.post('/login', function (req, res, next) {
        next()
    },
    passport.authenticate('local'), (req, res) => {
        var user = {
            username: req.user.username
        };
        console.log(user); // example output: { username: 'pat' }
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