const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('housing', { title: "Housing page" });
});

module.exports = router;