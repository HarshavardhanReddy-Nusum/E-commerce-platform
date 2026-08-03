const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },

    houseNo:{
        type: String,
        required: true
    },

    street:{
        type: String,
        required: true
    },

    city:{
        type: String,
        required: true
    },

    state:{
        type: String,
        required: true
    },

    pincode:{
        type: String,
        required: true
    },

    landmark:{
        type: String,
        required: true
    },

    addressType:{
        type:String,
        enum:["Home","Office"],
        required: true
    },

})

const addressModel = mongoose.model("address", addressSchema);

module.exports = addressModel;