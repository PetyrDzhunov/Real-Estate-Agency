const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('housing', { title: "Housing page" });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
})

module.exports = router;