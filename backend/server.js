require('dotenv').config()

const app = require('./src/app')
const connectDb = require('./src/db/db')

app.listen(process.env.PORT, () => {
    console.log("Running on the server 3000");
})

connectDb();