const router = require('express').Router();

const authService = require('../services/auth-service');
const { AUTH_COOKIE_NAME } = require('../constants');
const { isGuest } = require('../middlewares/auth-middleware');

router.get('/login', (req, res) => {
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
        console.log(err);
        res.end();
        //TODO: Return proper notification; 
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register', { title: "Register Page" });
});

router.post('/register', async(req, res) => {
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
        //TODO  : return error response;
        console.log(err);
    };
});

router.get('/logout', (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;