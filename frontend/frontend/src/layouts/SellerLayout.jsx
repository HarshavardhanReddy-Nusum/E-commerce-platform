import React from 'react'
import { Outlet } from 'react-router-dom'
import SellerNavbar from '../components/navbar/SellerNavbar'

const SellerLayout = () => {
  return (
    <div>
        <SellerNavbar />
        <Outlet />
    </div>
  )
}

export default SellerLayout