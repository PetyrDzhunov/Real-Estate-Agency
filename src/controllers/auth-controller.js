const router = require('express').Router();

const authService = require('../services/auth-service');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {

});

module.exports = router;