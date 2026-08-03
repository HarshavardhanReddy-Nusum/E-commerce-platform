const express = require('express')
const authController = require('../controller/auth.controller')
const authMiddleare = require('../middleware/auth.middleare')

const router = express.Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/logout', authController.logoutUser)
router.get('/profile',authMiddleare.verifyToken, authController.getUserById)
router.get("/verify", authMiddleare.verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

module.exports = router