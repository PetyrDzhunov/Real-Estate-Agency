const router = require('express').Router();
const housingService = require('../services/housing-service');
router.get('/', async(req, res) => {
    const housings = await housingService.getLastThreeCreated();

    res.render('home', { title: 'Home Page', housings });
});


router.get('/search', async(req, res) => {
    let housings = await housingService.search(req.query.text);
    res.render('search', { title: "Search Housing", housings });
});


module.exports = router;