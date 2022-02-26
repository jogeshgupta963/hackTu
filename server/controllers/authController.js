const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const userModel = require('../model/userModel')

//@route GET /api/v1/auth
//@desc test auth
async function login(req, res) {
    let id = req.body.payload;
    let user = await userModel.findById(id);
    res.status(200).json({ msg: user });
}

//route POST /api/v1/auth
//@desc login

async function postLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json("Invalid Credentials")
        }
        let matchPass = await bcrypt.compare(password, user.password)
        if (!matchPass) {
            return res.status(400).json("Invalid Credentials")
        }

        const JWT = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, { expiresIn: 60 })
        res.cookie("JWT", JWT, { httpOnly: true })
        return res.status(200).json(JWT)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

module.exports = { login, postLogin }