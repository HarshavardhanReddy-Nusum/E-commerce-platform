const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true
    },

    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address",
        required: true
    },

    quantity: {
        type: Number,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        default: "COD"
    },

    orderStatus: {
        type: String,
        enum: [
            "Placed",
            "Packed",
            "Shipped",
            "Out for Delivery",
            "Delivered",
            "Cancelled"
        ],
        default: "Placed"
    }

}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;