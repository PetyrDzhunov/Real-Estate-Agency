const router = require('express').Router();

const housingService = require('../services/housing-service');
router.get('/', (req, res) => {
    res.render('housing', { title: "Housing page" });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async(req, res) => {
    try {
        await housingService.create(req.body)
        res.redirect('/');
    } catch (err) {
        console.log(err);
    };
});

module.exports = router;