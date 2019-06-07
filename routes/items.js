const express = require('express');
const router = express.Router()
const Item = require('../database/models/item');


router.post('/add', (req, res) => {
    
    if (!req.body.name && !req.body.quantity) {
        return res.status(400).json({error: "please enter the correct fields: name and quantity"});
    }

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
        //if no items are in the DB it will return an empty array *** may need to account for this ****
        
        // this has to be just an item obj or it wont parse correctly inside items-list.js
        res.status(200).json(item);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
});

router.post('/delete/:id', (req, res) => {
    Item.findByIdAndRemove({_id: req.params.id})
    .then(item => {
            res.status(200).json({message: "item removed " + item});
        })
        .catch(err => {
            res.status(400).json({error: err});
        })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Item.findById(id)
    .then(item => {
        res.status(200).json(item);
    })
    .catch(err => {
        res.status(400).json({error: err});
    })
});







module.exports = router;

