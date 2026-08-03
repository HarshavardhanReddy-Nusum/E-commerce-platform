// const jwt = require('jsonwebtoken')

// async function authUser(req, res, next) {
//     const token = req.cookies.loginToken;

//     if (!token) {
//         return res.status(401).json({
//             message: "Unauthorized"
//         })
//     }

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         console.log(decoded.role)
//         if (decoded.role !== "user") {
//             return res.status(403).json({ message: "You dont have access!" })
//         }

//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({
//             message: "Unauthorized"
//         })
//     }
// }


// async function authSeller(req, res, next) {
//     const token = req.cookies.loginToken;

//     if (!token) {
//         return res.status(401).json({
//             message: "Unauthorized"
//         })
//     }

//     try {

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         console.log(decoded.role)
//         if (decoded.role !== "seller") {

//             return res.status(403).json({ message: "You dont have access!" })

//         }

//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({
//             message: "Unauthorized"
//         })
//     }
// }


const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    const token = req.cookies.loginToken;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
}

function authUser(req, res, next) {

    if (req.user.role !== "user") {
        return res.status(403).json({
            message: "You don't have access!"
        });
    }

    next();
}

function authSeller(req, res, next) {

    if (req.user.role !== "seller") {
        return res.status(403).json({
            message: "You don't have access!"
        });
    }

    next();
}


module.exports = { verifyToken, authSeller, authUser }