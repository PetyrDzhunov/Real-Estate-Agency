const router = require('express').Router();

const housingService = require('../services/housing-service');

const { isAuth } = require('../middlewares/auth-middleware');

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

router.get('/:housingId/details', isAuth, async(req, res) => {
    let id = req.params.housingId;
    let housing = await housingService.getOne(id);
    let isOwner = housing.owner == req.user._id;
    res.render('housing/details', {...housing, isOwner });
});

module.exports = router;