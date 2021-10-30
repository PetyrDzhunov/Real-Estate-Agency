exports.PORT = 5000;
exports.DB_CONNECTION_STRING = 'mongodb://localhost:27017/real-estate';
exports.SALT_ROUNDS = Math.floor(Math.random() * 10 + 10);
exports.JWT_SECRET = '6BF2CE436E25C7F3B31B295FABF8C';
exports.AUTH_COOKIE_NAME = "token";