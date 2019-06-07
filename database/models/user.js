const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;


// ADD VALIDATIONS!!!
const userSchema = new Schema({

	username: { 
        type: String, 
        unique: false, 
        required: true 
    },
	password: { 
        type: String, 
        unique: false, 
        required: true 
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
