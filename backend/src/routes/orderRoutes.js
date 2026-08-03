const express = require('express')
const authMiddleware = require('../middleware/auth.middleare')
const orderController = require('../controller/order.controller')

const router = express.Router();

router.post('/addOrder', authMiddleware.verifyToken, authMiddleware.authUser, orderController.addOrder)
router.post('/addCartOrder', authMiddleware.verifyToken, authMiddleware.authUser, orderController.addCartOrder)
router.get('/getOrders', authMiddleware.verifyToken, authMiddleware.authUser, orderController.getOrders)
router.get('/getSellerOrders', authMiddleware.verifyToken, authMiddleware.authSeller, orderController.getSellerOrders)
router.patch('/:id', authMiddleware.verifyToken, authMiddleware.authSeller, orderController.updateOrder)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.authUser, orderController.removeOrder)

module.exports = router;