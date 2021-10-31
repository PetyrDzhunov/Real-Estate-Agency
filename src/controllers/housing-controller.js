const router = require('express').Router();

const housingService = require('../services/housing-service');

const { isAuth } = require('../middlewares/auth-middleware');

router.get('/', async(req, res) => {
    let housings = await housingService.getAll();
    res.render('housing', { title: 'Housing', housings });
});

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async(req, res) => {
    try {
        await housingService.create({...req.body, owner: req.user._id });
        res.redirect('/housing');
    } catch (error) {
        console.log(error)
        res.render('housing/create', { error: getErrorMessage(error) });
    };
});

function getErrorMessage(error) {
    let errorNames = Object.keys(error.errors);
    if (errorNames.length > 0) {
        return error.errors[errorNames[0]];
    } else {
        return error.message;
    };
};

router.get('/:housingId/details', async(req, res) => {
    let id = req.params.housingId;
    let housing = await housingService.getOne(id);
    let housingData = await housing.toObject();
    let isOwner;
    let tenants = housing.getTenants();
    let isAvailable = housing.availablePieces > 0;
    let isRentedbyYou;

    //can also use optional chaining.
    if (req.user) {
        isOwner = housingData.owner == req.user._id;
        isRentedbyYou = housing.tenants.some((tenant) => tenant._id == req.user._id);
    } else {
        isOwner = undefined;
        isRentedbyYou = undefined;
    }
    res.render('housing/details', {...housingData, isOwner, tenants, isAvailable, isRentedbyYou });
});

router.get('/:housingId/rent', isOwner, async(req, res) => {
    try {
        await housingService.addTenant(req.params.housingId, req.user._id);
        res.redirect(`/housing/${req.params.housingId}/details`)
    } catch (error) {
        console.log(error)
    };
});

router.get('/:housingId/delete', isNotOwner, async(req, res) => {
    await housingService.delete(req.params.housingId);
    res.redirect('/housing');
});

router.get('/:housingId/edit', isNotOwner, async(req, res) => {
    let housing = await housingService.getOne(req.params.housingId);

    res.render('housing/edit', {...housing.toObject() });
});



router.post('/:housingId/edit', isNotOwner, async(req, res) => {
    await housingService.updateOne(req.params.housingId, req.body);
    res.redirect(`/housing/${req.params.housingId}/details`);
});



async function isOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);
    if (housing.owner == req.user._id) {
        res.redirect(`/housing/${req.params.housingId}/details`);
    } else {
        next();
    };
};


async function isNotOwner(req, res, next) {
    let housing = await housingService.getOne(req.params.housingId);
    if (housing.owner != req.user._id) {
        next();
    } else {
        res.redirect(`/housing/${req.params.housingId}/details`);
    };
};
module.exports = router;