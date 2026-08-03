require('dotenv').config()

const ImageKit = require('@imagekit/nodejs')


const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC,
    privateKey: process.env.IMAGE_KIT_PRIVATE,
})

async function uploadFile(file) {
    const result = await imagekit.files.upload({
        file,
        fileName: "products" + Date.now(),
        folder: "products/e-commerce"
    })

    return result;

}

module.exports = { uploadFile }