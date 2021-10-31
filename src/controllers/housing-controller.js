const router = require('express').Router();

const housingService = require('../services/housing-service');


router.get('/', async(req, res) => {
    let housings = await housingService.getAll();
    res.render('housing', { title: 'Housing', housings });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async(req, res) => {
    try {
        await housingService.create({...req.body, owner: req.user._id });
        res.redirect('/housing');
    } catch (err) {
        console.log(err);
    };
});

module.exports = router;