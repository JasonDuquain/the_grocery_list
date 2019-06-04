
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const uri = process.env.MONGO_URL;

mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => {console.log('Connected to Mongodb');},
    err => {
         console.log('error connecting to Mongo: ')
         console.log(err);
        }
);



module.exports = mongoose.connection