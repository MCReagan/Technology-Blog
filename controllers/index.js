const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./api/dashboardRoutes.js');
const loginRoutes = require('./api/loginRoutes.js');
const signupRoutes = require('./api/signupRoutes.js');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signupRoutes);

module.exports = router;
