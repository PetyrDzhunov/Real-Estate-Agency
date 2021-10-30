const jwt = require('../utils/jwt');

const User = require('../models/User');
const { JWT_SECRET } = require('../constants');


exports.login = async({ username, password }) => {
    // search for the user
    let user = await User.findOne({ username })
    if (!user) {
        //If there's no user return this error
        // which we will catch in the try catch block
        throw new Error('Invalid username or password');
    };

    //check the user password
    let isValid = await user.validatePassword(password);
    if (!isValid) {
        throw new Error('Invalid username or password');
    };

    //TODO : create token which we will return  as a promise;
    let payload = {
        _id: user._id,
        name: user.name,
        username: user.username,
    };
    let token = await jwt.sign(payload, JWT_SECRET);

    return token;

};

exports.register = (userData) => User.create(userData);