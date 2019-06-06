const express = require('express');
const router = express.Router()
const Item = require('../database/models/item');


router.post('/add', (req, res) => {
    let item = new Item(req.body);
    item.save()
    .then(item => {
            res.status(201).json({message: "item added " + item});
        })
        .catch(err => {
            res.status(400).json({error: err});
        })
});

router.get('/', (req, res) => {
    Item.find()
    .then(item => {
        
        // this has to be just an item obj or it wont parse correctly inside items-list
        res.status(200).json(item);
    })
    .catch(err => {
        res.status(400).send("getting items failed")
    })
});









module.exports = router;

