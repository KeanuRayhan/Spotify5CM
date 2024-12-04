const express = require('express');
const router = express.Router();
const { startgetartistPopularity } = require('../controllers/artistController');

// Rute untuk mendapatkan artist berdasarkan popularity, dan filter berdasarkan region/country
router.get('/artists/popularity', startgetartistPopularity);

module.exports = router;
