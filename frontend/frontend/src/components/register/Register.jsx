import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "",
    })

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData)

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", formData,
                { withCredentials: true }
            )

            console.log(response.data)
            alert("Welcome user")

            if(response.data.user.role == "user") {
                navigate('/home')
            } else {
                navigate('/seller/home')
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input type="text" name='username' onChange={handleChange} placeholder='Username' value={formData.username} required />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name='email'
                        value={formData.email} placeholder='Email'
                        onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name='password'
                        value={formData.password}
                        onChange={handleChange} placeholder='Password' required />
                </div>
                <div>
                    <label htmlFor="role"></label>
                    <select name="role"
                        onChange={handleChange} value={formData.role}>
                        <option value="">select role</option>
                        <option value="user">user</option>
                        <option value="seller">seller</option>
                    </select>
                </div>
                <div>
                    <button>Register</button>
                </div>
            </form>
        </>
    )
}

export default Register