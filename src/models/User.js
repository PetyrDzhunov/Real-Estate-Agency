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

    bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
        if (err) {
            throw new Error('Cannot hash password');
        };
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;