const express = require('express');
const { startMatching } = require('../controllers/matchController');
const router = express.Router();

router.post('/match', startMatching);

module.exports = router;
