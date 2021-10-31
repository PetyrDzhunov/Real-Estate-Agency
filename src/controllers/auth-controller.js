const router = require('express').Router();

const authService = require('../services/auth-service');
const { AUTH_COOKIE_NAME } = require('../constants');
const { isGuest, isAuth } = require('../middlewares/auth-middleware');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async(req, res) => {
    const { name, username, password } = req.body;
    try {
        let token = await authService.login({
            username,
            password
        });
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        console.log(err.errors);
        res.render('auth/login');
        //TODO: Return proper notification; 
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register', { title: "Register Page" });
});

router.post('/register', isGuest, async(req, res) => {
    const { name, username, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.error = 'Password missmatch';
        return res.render('/auth/register', { title: "Register Page" });
    };

    try {

        await authService.register({ name, username, password });

        let token = await authService.login({ username, password });
        res.cookie(AUTH_COOKIE_NAME, token);
        res.redirect('/');
    } catch (err) {
        let error = err.errors;
        console.log(error);
        res.render('auth/register');
    };
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;