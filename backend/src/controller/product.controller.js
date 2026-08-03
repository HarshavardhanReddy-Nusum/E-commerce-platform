const productModel = require('../models/product.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.services');
const cartModel = require('../models/cart.model');

async function createProduct(req, res) {

    const { title, description, price, discountedPrice, brand } = req.body;

    const file = req.file;

    if (!file) {
        res.status(400).json({ message: "No file uploaded!" })
    }
    const result = await uploadFile(file.buffer.toString('base64'))
    const product = await productModel.create({
        title,
        imageUri: result.url,
        description,
        price,
        discountedPrice,
        brand,
        seller: req.user.id
    })

    res.status(201).json({
        message: "Product created success",
        product: {
            title,
            description,
            price,
            discountedPrice,
            brand
        }
    })


}

async function getProducts(req, res) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 20;

        const totalProducts = await productModel.countDocuments();

        const products = await productModel
            .find()
            .populate("seller", "username")
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            message: "Products fetched successfully.",
            products,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: page,
            totalProducts
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getSellerProducts(req, res) {
    const id = req.user.id
    const products = await productModel.find({
        seller: id
    }).limit(20)

    res.status(200).json({
        message: "Product fetched successfully.",
        products: products
    })

}

async function getProductById(req, res) {

    const id = req.params.productId;
    const product = await productModel.findById(id).populate("seller", "username email")

    res.status(200).json({
        message: "Product feteched success.",
        product: product
    })
}

async function createCart(req, res) {
    try {
        const { productId, quantity } = req.body;

        const existingCart = await cartModel.findOne({
            user: req.user.id,
            product: productId
        });

        if (existingCart) {
            existingCart.quantity += quantity;
            await existingCart.save();

            return res.json({
                message: "Cart updated",
                cart: existingCart
            });
        }

        const cart = await cartModel.create({
            user: req.user.id,
            product: productId,
            quantity
        })

        res.status(201).json({ message: "Cart created successfully", cart })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}

async function getCartItems(req, res) {
    try {
        const cart = await cartModel.find({
            user: req.user.id
        }).populate({
            path: "product",
            populate: {
                path: "seller",
                select: "username"
            }
        });

        res.status(200).json({
            message: "Cart fetched successfully.",
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function removeCartItem(req, res) {

    try {
        const { id } = req.params;
        const cart = await cartModel.findOneAndDelete({
            _id: id,
            user: req.user.id
        })

        if (!cart) {
            return res.status(400).json({ message: "Cart item not found" })
        }

        res.status(200).json({ message: "Item removed success." })
    } catch (error) {
        res.status(500).json({ message: "Internal server error!" })
    }
}

async function updateProduct(req, res) {
    try {
        const { id } = req.params
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(401).json({ message: "Product not found" })
        }
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" })
        }

        product.title = req.body.title ?? product.title;
        product.description = req.body.description ?? product.description;
        product.price = req.body.price ?? product.price;
        product.discountedPrice = req.body.discountedPrice ?? product.discountedPrice;
        product.brand = req.body.brand ?? product.brand;
        const updatedfile = req.file;
        if (updatedfile) {
            const result = await uploadFile(updatedfile.buffer.toString('base64'))
            product.imageUri = result.url
        }
        await product.save()

        res.status(200).json({ message: "Product updated successfully." })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(401).json({ message: "Product not found" })
        }
        if (product.seller.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" })
        }
        const deletedProduct = await productModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Delete success", deletedProduct })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { createProduct, getProducts, getProductById, getSellerProducts, createCart, getCartItems, removeCartItem, updateProduct, deleteProduct }