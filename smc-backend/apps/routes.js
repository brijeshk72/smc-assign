var router = require('express').Router();

router.use('/users', require('./users/routes'));
router.use('/product', require('./products/routes'));

module.exports = router;