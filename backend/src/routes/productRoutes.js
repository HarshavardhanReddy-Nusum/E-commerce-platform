const express = require('express')
const productController = require('../controller/product.controller')
const multer = require('multer')
const authMiddleare = require('../middleware/auth.middleare')

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router()

router.post('/upload', authMiddleare.verifyToken, authMiddleare.authSeller, upload.single("product"), productController.createProduct)
router.get('/', authMiddleare.verifyToken, authMiddleare.authUser, productController.getProducts)
router.get('/seller', authMiddleare.verifyToken, authMiddleare.authSeller, productController.getSellerProducts)
router.post('/cart', authMiddleare.verifyToken, authMiddleare.authUser, productController.createCart)
router.get('/cartItems', authMiddleare.verifyToken, authMiddleare.authUser, productController.getCartItems)
router.get('/:productId', authMiddleare.verifyToken, productController.getProductById)
router.delete('/cart/:id', authMiddleare.verifyToken, authMiddleare.authUser, productController.removeCartItem)
router.patch(
    "/:id",
    authMiddleare.verifyToken,
    authMiddleare.authSeller,
    upload.single("product"),
    productController.updateProduct
); 
router.delete(
    "/:id",
    authMiddleare.verifyToken,
    authMiddleare.authSeller,
    productController.deleteProduct
);
module.exports = router;