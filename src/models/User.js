const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
        .then(function(hash) {
            this.password = hash;
            return next();
        });
});

const User = mongoose.model('User', userSchema);
module.exports = User;