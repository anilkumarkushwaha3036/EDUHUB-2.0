const express = require('express');
const router = express.Router();
const { getResourceTypes } = require('../controllers/resourceTypeController');

router.get('/', getResourceTypes);

module.exports = router;
