const router = require('express').Router();
const isLoggedIn = require('../../utils/auth');

router.get('/', async (req, res) => {
    res.render('all');
});

module.exports = router;