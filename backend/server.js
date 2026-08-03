require('dotenv').config()

const app = require('./src/app')
const connectDb = require('./src/db/db')

app.listen(3000, () => {
    console.log("Running on the server 3000");
})

connectDb();