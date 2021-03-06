
const Item = require('../database/models/item');


module.exports = {
    
    create(req, res) {
       if (!req.body.name && !req.body.quantity) {
            return res.status(400).json({ error: "please enter the correct fields: name and quantity" });
        }

        let item = new Item(req.body);

        item.save()
        .then(item => {
                res.status(201).json({ message: "item added " + item });
            })
            .catch(err => {
                res.status(400).json({ error: err });
            }) 
    },
    
    showAll(req, res) {
        
        Item.find()
        .then(item => {
            let newItems = item.filter((el, idx) => {
                return el.username === req.user.username
            })
            res.status(200).json(newItems);
        })
        .catch(err => {
            res.status(400).json({ error: err });
        }) 
    },
    
    delete(req, res) {
        
        Item.findByIdAndRemove({ _id: req.params.id })
        .then(item => {
            res.status(200).json({ message: "item removed " + item });
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
    },
    
    show(req, res) {
        const id = req.params.id;
    
        Item.findById(id)
        .then(item => {
            res.status(200).json(item);
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
    },
    
    edit(req, res) {
        
        if (!req.body.name && !req.body.quantity) {
            return res.status(400).json({ error: "please enter the correct fields: name and quantity" });
        }
    
        /** added {new:true} to ensure the updated item is returned **/
        Item.findByIdAndUpdate(req.params.id, { "$set": { 
            "name": req.body.name, 
            "quantity": req.body.quantity,
            "purchased": false
        }}, { new: true })
        .then(item => {
            res.status(200).json({ message: "item updated: " + item })
        })
        .catch(err => {
            res.status(400).json({ error: err });
        })
        
    }
    
    
}



