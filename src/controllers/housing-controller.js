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

router.get('/:housingId/details', async(req, res) => {
    let id = req.params.housingId;
    let isOwner;
    let housing = await housingService.getOne(id);
    let tenants = housing.getTenants();
    let housingData = await housing.toObject();
    if (req.user) {
        isOwner = housing.owner === req.user._id;
    } else {
        isOwner = undefined;
    }
    res.render('housing/details', {...housingData, isOwner, tenants });
});

module.exports = router;