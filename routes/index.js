const express = require('express');
const router = express.Router();
const converterRoutes = require('./converterRoutes');

router.use('/', converterRoutes);

module.exports = router;
