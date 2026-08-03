const mongoose = require('mongoose')

async function connectDb() {
    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected sucess");
        
    } catch (error) {
        console.log("Error while connecting to dataase.",error);
    }

}

module.exports = connectDb