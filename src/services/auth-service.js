const User = require('../models/User');

exports.login = async({ username, password }) => {
    // search for the user
    let user = await User.findOne({ username }).lean();
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


};

exports.register = (userData) => User.create(userData);