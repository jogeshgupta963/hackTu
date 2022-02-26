const express = require('express')
const gravatar = require('gravatar')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser")
const nodemailer = require('nodemailer')
const path = require('path')
const userModel = require('../model/userModel')
require("dotenv").config()


//get signup page
function getSignup(req, res) {

    res.sendFile(path.join(__dirname, "../public/", "index.html"));
}


async function postSignup(req, res) {
    try {



        let { name, email, password, college } = req.body

        //check college
        let clg = email.split("@")[1].split[0];
        if (clg != college) {
            return res.status(400).json("college email doesnt match")
        }

        //gravatar 
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // //hashing passwords
        let salt = await bcrypt.genSalt();

        let hashedString = await bcrypt.hash(password, salt.toString());

        password = hashedString;

        //creating user
        let user = await userModel.create({ name, email, password, avatar })

        // nodemailer email thx for joining us
        let gmailPass = process.env.gmailPass

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'jogeshgupta963@gmail.com',
                pass: gmailPass
            }
        });
        let info = transporter.sendMail({
            from: '"Welcome👻" <jogeshgupta963@gmail.com>',
            to: user.email,
            subject: `Welcome ${user.name} `,
            html: `<b>You have been registered.Welcome to the family</b>`,
        });

        //creating jwt
        const JWT = jwt.sign({ payload: user._id }, process.env.JWT_SECRET, { expiresIn: 60 })

        res.cookie("JWT", JWT, { httpOnly: true })
        return res.status(200).json("User Registered")

    } catch (error) {
        res.status(404).json(error.message)
    }
}

module.exports = { postSignup } 
