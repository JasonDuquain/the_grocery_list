const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;


const userSchema = new Schema({

	username: { 
        type: String,  
        required: true,
        minlength: 1,
        maxlength: 200
    },
	password: { 
        type: String, 
        minlength: 8,
        maxlength: 200
    }

});


userSchema.methods.hashPassword = function(plainTextPassword) {
    return bcrypt.hashSync(plainTextPassword, 10);
};

userSchema.methods.checkPassword = function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
};


userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('no password provided');
		next();
	} else {
		this.password = this.hashPassword(this.password);
		next();
	}
});



const User = mongoose.model('User', userSchema);
module.exports = User;
