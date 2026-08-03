const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const addressRoutes = require('./routes/addressRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173",
    "https://e-commerce-platform-harshas-projects-eef943aa.vercel.app/"],
    credentials: true
}));

app.use('/api/auth', authRoutes)
app.use('/api/product', productRoutes)
app.use('/api/address', addressRoutes)
app.use('/api/order', orderRoutes)

module.exports = app;