# 🛒 E-Cart – MERN E-Commerce Platform

A full-stack E-Commerce web application built using the MERN Stack. The platform allows users to browse products, manage their cart, place orders, and track purchases, while sellers can upload products, manage inventory, and process customer orders.

## 🚀 Features

### 👤 User Features

* User Registration & Login (JWT Authentication)
* Secure Password Encryption
* Browse Products
* View Product Details
* Add to Cart
* Buy Now
* Manage Delivery Addresses
* Place Orders
* View Order History
* Track Order Status
* Responsive User Interface

### 🛍️ Seller Features

* Seller Registration & Login
* Upload Products with Images
* Update Product Details
* Delete Products
* View Uploaded Products
* View Customer Orders
* Update Order Status

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Cookie Parser
* CORS

### Image Storage

* ImageKit

## 📂 Project Structure

```text
client/
│── src/
│── public/
│── package.json

server/
│── controllers/
│── middleware/
│── models/
│── routes/
│── config/
│── package.json
```

## 🔐 Authentication

* JWT-based Authentication
* HTTP-Only Cookies
* Protected Routes
* Role-Based Authorization (User & Seller)

## 📦 Main Modules

* Authentication
* Product Management
* Cart Management
* Address Management
* Order Management
* Seller Dashboard
* User Dashboard

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend/frontend
npm install
npm run dev
```

## 🌐 Environment Variables

Create a `.env` file in the backend folder and configure:

```env
PORT=
MONGODB_URI=
JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```


## 🔮 Future Enhancements

* Online Payment Integration (Razorpay/Stripe)
* Product Search & Filters
* Wishlist
* Product Reviews & Ratings
* Email Notifications
* Inventory Management
* Admin Dashboard
* Sales Analytics
* Coupons & Offers
* Product Recommendations

## 👨‍💻 Author

**Harshavardhan Reddy N.**

* Java Full Stack Developer
* MERN Stack Developer

## 📄 License

This project is developed for learning, portfolio, and educational purposes.
