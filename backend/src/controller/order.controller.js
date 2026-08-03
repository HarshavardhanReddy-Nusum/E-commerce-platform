const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const addressModel = require('../models/address.model')

async function addOrder(req, res) {
    try {
        const { productId, addressId, quantity, paymentMethod } = req.body;

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

        const address = await addressModel.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: "Address not found" })
        }

        if (address.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" })
        }

        const totalPrice = product.discountedPrice * quantity;

        const order = await orderModel.create({
            user: req.user.id,
            seller: product.seller,
            product: product._id,
            address: address._id,
            quantity,
            totalPrice,
            paymentMethod,
        })

        return res.status(201).json({ message: "Order created successfully!", order })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function addCartOrder(req, res) {
    try {
        const cartItems = await cartModel.find({ user: req.user.id });

        for (const item of cartItems) {
            const order = await orderModel.create({
                user: req.user.id,
                seller: item.product.seller,
                product: item.product._id,
                quantity: item.quantity,
                address: addressId,
                paymentMethod,
                totalPrice: item.product.discountedPrice * item.quantity,
            });
        }

        await cartModel.deleteMany({ user: req.user.id });
        return res.status(201).json({ message: "Order created successfully.", order })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function getOrders(req, res) {
    try {
        const orders = await orderModel.find({
            user: req.user.id,
        }).populate("product").populate("seller", "username email").populate("address")

        return res.status(200).json({ message: "Orders fetched success.", orders })
    } catch (error) {
            console.log(error.response?.status);
            console.log(error.response?.data);
        return res.status(500).json({ message: error.message })
    }
}

async function getSellerOrders(req, res) {
    try {
        const orders = await orderModel.find({
            seller: req.user.id,
        }).populate("product").populate("user", "username email").populate("address")

        return res.status(200).json({ message: "Orders fetched success.", orders })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function updateOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id)

        if (!order) {
            return res.status(404).json({ message: "Order not found!" })
        }
        order.orderStatus = req.body.orderStatus ?? order.orderStatus;
        await order.save()

        return res.status(200).json({ message: "order updated successfully." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function removeOrder(req, res) {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id)

        if (!order) {
            return res.status(404).json({ message: "Order not found" })
        }
        await order.deleteOne()

        return res.status(200).json({ message: "Order deleted successfully." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { addOrder, getOrders, getSellerOrders, updateOrder, removeOrder, addCartOrder }