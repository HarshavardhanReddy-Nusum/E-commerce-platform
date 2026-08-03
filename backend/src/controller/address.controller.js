const addressModel = require('../models/address.model')

async function addAddress(req, res) {

    try {
        const { fullname, mobile, houseNo, street, city, state, pincode, landmark, addressType } = req.body;

        const address = await addressModel.create({
            user: req.user.id,
            fullname,
            mobile,
            houseNo,
            street,
            city,
            state,
            pincode,
            landmark,
            addressType
        })

        return res.status(201).json({ message: "Address created successfully", address })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function getAddress(req, res) {
    try {
        const address = await addressModel.find({
            user: req.user.id
        });
        return res.status(200).json({ message: "Address fetched successfully", address })
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

async function updateAddress(req, res) {
    try {
        const { id } = req.params;

        console.log(id)

        const address = await addressModel.findById(id)

        if (!address) {
            return res.status(404).json({ message: "Address not found" })
        }
        if (address.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" })
        }

        address.fullname = req.body.fullname ?? address.fullname;
        address.mobile = req.body.mobile ?? address.mobile;
        address.houseNo = req.body.houseNo ?? address.houseNo;
        address.street = req.body.street ?? address.street;
        address.city = req.body.city ?? address.city;
        address.state = req.body.state ?? address.state;
        address.pincode = req.body.pincode ?? address.pincode;
        address.landmark = req.body.landmark ?? address.landmark;
        address.addressType = req.body.addressType ?? address.addressType;

        await address.save()

        return res.status(200).json({ message: "address updated successfully." })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function removeAddress(req, res) {
    try {
        const { id } = req.params;

        const address = await addressModel.findById(id)

        if (!address) {
            return res.status(404).json({ message: "Address not found" })
        }
        if (address.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Unauthorized!" })
        }

        await address.deleteOne();

        return res.status(200).json({ message: "Address removed success.", address })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { addAddress, getAddress, updateAddress, removeAddress }