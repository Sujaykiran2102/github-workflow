const express = require('express');
const router = express.Router();
const { submitCode, recordResult } = require('../controllers/battleController');

router.post('/submit', submitCode);
router.post('/record', recordResult);

module.exports = router;