
const cookieParser = require("cookie-parser")
const jwt = require('jsonwebtoken')
const validator = require('validator')
require('dotenv').config()


function jwtVerify(req, res, next) {
    try {
        let token = req.cookies.JWT

        let isLoggedIn = jwt.verify(token, process.env.JWT_SECRET)
        if (req.body != {} && isLoggedIn) {
            req.body.user = isLoggedIn.payload;
            next()
        }
        else if (isLoggedIn) {
            req.body = isLoggedIn
            next();
        } else {
            throw new Error
        }

    } catch (error) {
        res.status(400).json("Unauthorised access is not permited")
    }

}

async function validation(req, res, next) {
    const { email, password } = req.body

    try {
        if (!validator.isEmail(email))
            return res.status(400).json({ err: "invalid email" })
        if (password == "")
            return res.status(400).json({ err: "invalid password" })
        next()
    }
    catch (err) {
        res.status(400).json({ err: "helper" + err.message })
    }
}
function authData(req, res, next) {

    const { status, skills } = req.body;
    if (status == "" || status == null || status == undefined || skills == "") {
        return res.status(400).json("status or skills is invalid")
    }
    else next()
}

module.exports = { jwtVerify, validation, authData }