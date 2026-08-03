const express = require('express')
const addressController = require('../controller/address.controller')
const authMiddleware = require('../middleware/auth.middleare')

const router = express.Router()

router.post('/addAddress', authMiddleware.verifyToken, authMiddleware.authUser, addressController.addAddress)
router.get('/getAddress', authMiddleware.verifyToken, authMiddleware.authUser, addressController.getAddress)
router.patch('/:id', authMiddleware.verifyToken, authMiddleware.authUser, addressController.updateAddress)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.authUser, addressController.removeAddress)

module.exports = router;