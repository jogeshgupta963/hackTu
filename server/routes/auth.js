const express = require("express")
const cookieParser = require("cookie-parser")
const authRouter = express.Router()

const { jwtVerify, validation } = require("../helper/authHelper")
const { login, postLogin } = require('../controllers/authController')

//@route GET /api/v1/auth       POST /api/v1/auth
//@desc      /Testlogin             /loginUser

authRouter
    .route('/')
    .get(jwtVerify, login)
    .post(validation, postLogin)
module.exports = authRouter