const router = require('express').Router();
const isLoggedIn = require('../../utils/auth');

router.get('/', async (req, res) => {
    res.render('login');
});


module.exports = router;