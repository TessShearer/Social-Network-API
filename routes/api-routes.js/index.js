const thoughtRoutes = require('./thoughts-routes');
const userRoutes = require('./user-routes');
const router = require('express').Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;