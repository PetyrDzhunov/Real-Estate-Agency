const { AUTH_COOKIE_NAME, JWT_SECRET } = require('../constants');
const jwt = require('../utils/jwt');

exports.auth = function(req, res, next) {
    let token = req.cookies[AUTH_COOKIE_NAME];

    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                req.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(AUTH_COOKIE_NAME);
                // res.status('401').render('404');
                res.redirect('/auth/login');
            });
    } else {
        // if there's no user -> we don;t need to
        // stop the request so we just call next
        next();
    };
};

exports.isAuth = function(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    };
};