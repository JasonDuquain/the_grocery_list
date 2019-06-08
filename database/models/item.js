const mongoose = require('mongoose');

const Schema = mongoose.Schema;


let Item = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: String
    },
    purchased: {
        type: Boolean
    },
    username: {
      type: String
    }
});


module.exports = mongoose.model('Item', Item);