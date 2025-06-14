const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/registrar', authController.registrar); // usar 1x só
router.post('/login', authController.login);

module.exports = router;
