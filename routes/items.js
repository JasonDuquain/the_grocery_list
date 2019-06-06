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
})



/*

businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

*/





module.exports = router;

