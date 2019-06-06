const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let Item = new Schema({
    name: {
        type: String
    },
    quantity: {
        type: Number
    },
    purchased: {
        type: Boolean
    }
});



module.exports = mongoose.model('Item', Item);