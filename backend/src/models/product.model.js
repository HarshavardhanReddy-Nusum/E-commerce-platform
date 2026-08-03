const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUri: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
    },
    brand: {
        type: String,
        required: true
    },
    seller: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
})

const productModel = mongoose.model("product", productSchema)

module.exports = productModel;