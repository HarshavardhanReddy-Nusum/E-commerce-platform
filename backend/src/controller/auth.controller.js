const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {

    // const { email, password, role = "user" } = req.body;
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const email = req.body.email.trim().toLowerCase();
    const role = req.body.role;

    const isAlreadyExists = await userModel.findOne({ email })

    if (isAlreadyExists) {
        res.status(409).json({ message: "User is already registered with this email." })
    }
    if (!username) {
        return res.status(400).json({
            message: "Username is required!"
        })
    }
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            message:
                "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: "Please enter a valid email address."
        });
    }


    const hash = await bcrypt.hash(password, 10)

    const users = await userModel.create({
        username,
        email,
        password: hash,
        role,
    })

    const token = jwt.sign({
        id: users._id,
        role: users.role
    }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        messsage: "User registered success",
        user: {
            username: users.username,
            email: users.email,
            role: users.role,
        }
    }
    )
}

async function loginUser(req, res) {

    const { username, email, password } = req.body;
    console.log(req.body)

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET)

    res.cookie("loginToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        message: "User login successfully.",
        users: {
            username: user.username,
            email: user.email,
            role: user.role,
            address: user.address
        }
    })
}

async function logoutUser(req, res) {
    res.clearCookie("loginToken")
    res.status(200).json({ message: "User logout successful." })
}

async function getUserById(req, res) {

    try {
        const id = req.user.id

        const user = await userModel.findById(id).select("-password")
        // if (!user) {
        //     return res.status(401).json({ message: "Unauthorized!" })
        // }
        res.status(200).json({ message: "User fetched success.", user })
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
}


module.exports = { registerUser, loginUser, logoutUser, getUserById }