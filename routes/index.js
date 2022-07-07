// This file does not help with organization much now, but when the front end and additional routes folders like html routes are added, then this will help us streamline that

const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>404</h1>');
});

module.exports = router;
