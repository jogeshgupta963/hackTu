const express = require("express")

const { postSignup } = require('../controllers/userController')
const { validation } = require('../helper/validation')
const userRouter = express.Router()

//@route  POST api/v1/users
//@desc   Register user
//
userRouter
    .route('/')
    .post(validation, postSignup)

module.exports = userRouter