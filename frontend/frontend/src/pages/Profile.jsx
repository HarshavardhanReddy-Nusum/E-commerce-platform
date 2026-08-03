import axios from 'axios'
import React, { useState } from 'react'

const Profile = () => {

  const [profile, setProfile] = useState([])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        withCredentials: true
      })

      setProfile(response.data.user)

    } catch (error) {
      console.log(error.response?.data)
    }
  }
  fetchProfile()
  return (
    <>
      <div className='profile-container'>
        <h1>My Profile</h1>
        <hr />
        <p>  🆔 {profile._id}</p>
        <p>🛡️ {profile.username}</p>
        <p>📧 {profile.email}</p>
      </div>
    </>
  )
}

export default Profile