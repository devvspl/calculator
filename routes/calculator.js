const express = require('express');
const { calculate } = require('../controllers/calculatorController');

const router = express.Router();

// POST /api/calculate
router.post('/calculate', calculate);

module.exports = router;