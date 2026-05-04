const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/google-login', authController.googleLogin);
router.post('/send-otp', authController.sendOTP);

module.exports = router;
