const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [6, 'Name should be at least 6 charcaters']
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre('save', function(next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;
            return next();
        });
});
//returns a promise which returns true/false; 
// resolve it in login functionality at authService;
userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password)
});

const User = mongoose.model('User', userSchema);
module.exports = User;