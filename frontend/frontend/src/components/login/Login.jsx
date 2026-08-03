import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {

  const [isLogin, setIsLogin] = useState(true)
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const url = isLogin ? `${import.meta.env.VITE_API_URL}/api/auth/login` : `${import.meta.env.VITE_API_URL}/api/auth/register`
      const response = await axios.post(url,
        loginData,
        { withCredentials: true }
      )
      setMessage(response.data.message);
      setMessageType("success")
      console.log(response.data);
      { isLogin ? alert(`Welcome back ${loginData.username}`) : alert(`Welcome user ${loginData.username}`) }
      if (isLogin && response.data.users.role == "user") {
        navigate('/home')
      } else {
        navigate('/seller/home')
      }
    } catch (error) {
      console.log(error.response.data)
      setMessage(error.response.data.message)
      setMessageType("error")
    }

    setLoginData({
      username: "",
      email: "",
      password: "",
      role: ""
    })
  }

  return (
    <>
      <div className='container'>
        {isLogin &&
          <div className='left'>
            Welcome back to the e-cart <br />
            Login and order your favourite items
            <button onClick={() => setIsLogin(false)}>Register</button>
          </div>
        }

        <div className='center'>

          {message && (
            <p className={messageType === "success" ? "success-message" : "error-message"}>
              {message}
            </p>
          )}

          <h1>{isLogin ? "Login" : "Register"}</h1>

          <form onSubmit={handleSubmit}>
            <div className='form-div'>
              <label htmlFor="username">Username:</label>
              <input type="username" name='username'
                onChange={handleChange}
                value={loginData.username} placeholder='Enter your username' required />
            </div>

            <div className='form-div'>
              <label htmlFor="email">Email:</label>
              <input type="email" name='email'
                onChange={handleChange}
                value={loginData.email} placeholder='Enter your email' required />
            </div>

            <div className='form-div'>
              <label htmlFor="password">Password:</label>
              <input type="password" name='password'
                onChange={handleChange}
                value={loginData.password} placeholder='Type your password' required />
            </div>
            {!isLogin && (
              <div className='form-div'>
                <label htmlFor="role">Select Role: </label>
                <select name="role"
                  onChange={handleChange} value={loginData.role} required>
                  <option value="">select role</option>
                  <option value="user">user</option>
                  <option value="seller">seller</option>
                </select>
              </div>
            )}
            <div className='form-button'>
              <button>{isLogin ? "Login" : "Register"}</button>
            </div>
          </form>
        </div>
        {!isLogin &&
          <div className='right'>
            Welcome to the e-cart <br />
            Register and explore more <br />
            <button onClick={() => setIsLogin(true)}>Login</button>
          </div>
        }
      </div>

    </>
  )
}

export default Login