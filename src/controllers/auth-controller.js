const router = require('express').Router();

const authService = require('../services/auth-service');
const { AUTH_COOKIE_NAME } = require('../constants');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async(req, res) => {
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

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async(req, res) => {
    const { name, username, password, rePassword } = req.body;

    if (password !== rePassword) {
        res.locals.error = 'Password missmatch';
        return res.render('/auth/register', )
    };

    try {
        let token = await authService.register({ name, username, password });
        //TODO : Set token in httpOnly cookie;
        res.redirect('/')
    } catch (err) {
        //TODO  : return error response;
    };
});

module.exports = router;