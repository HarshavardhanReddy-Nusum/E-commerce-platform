const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const cartModel = mongoose.model("cart", cartSchema)

module.exports = cartModel