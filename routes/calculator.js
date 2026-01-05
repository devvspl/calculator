const express = require('express');
const { calculate, getHistory } = require('../controllers/calculatorController');

const router = express.Router();

// POST /api/calculate
router.post('/calculate', calculate);

// GET /api/history
router.get('/history', getHistory);

module.exports = router;