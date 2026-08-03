import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import AuthLayout from './layouts/AuthLayout'
import UserLayout from './layouts/UserLayout'
import SellerLayout from './layouts/SellerLayout'
import Cart from './pages/Cart'
import ProtectedRoute from './ProtectedRoute'
import SellerHome from './pages/seller/SellerHome'
import BuyNow from './pages/BuyNow'
import SellerOrders from './pages/seller/SellerOrders'

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path='/orders' element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path='/buy-now/:id' element={<ProtectedRoute><BuyNow /></ProtectedRoute>} />
        </Route>
        <Route element={<SellerLayout />}>
          <Route path='/seller/home' element={<ProtectedRoute><SellerHome /></ProtectedRoute>} />
          <Route path='/seller/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path='/seller/orders' element={<ProtectedRoute><SellerOrders /></ProtectedRoute>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
