import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import logo from '../../assets/ecommerce-logo.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const logoutUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/auth/logout", {
        withCredentials: true
      })
      navigate('/')

    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <>
      <div className='navbar'>
        <div className='image'>
          <img src={logo} alt="" />
        </div>
        <div className='nav-class'>
            <Link to='/home'>Home</Link>
            <Link to='/orders'>Orders</Link>
            <Link to='/cart'>Cart</Link>
            <Link to='/profile'>Profile</Link>
            <button className="logout-button" onClick={() => logoutUser()}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default Navbar