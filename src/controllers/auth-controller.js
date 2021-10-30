const router = require('express').Router();

const authService = require('../services/auth-service');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async(req, res) => {
    const { name, username, password } = req.body;
    try {
        const user = await authService.login({
            username,
            password
        });
    } catch (err) {
        //todob 
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