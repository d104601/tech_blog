const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes.js');
const dashboardRoutes = require('./dashboardRoute.js');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

module.exports = router;
