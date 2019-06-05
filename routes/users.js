const express = require('express')
const router = express.Router()
const User = require('../database/models/user')


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

//*** for testing only - remove later ***
router.get('/', (req, res, next) => {
    User.find().count()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});




module.exports = router;