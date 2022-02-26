const express = require('express');

const { jwtVerify } = require('../helper/authHelper')

const homeRouter = express.Router();

//@route /api/v1/home
homeRouter
    .route("/")
    .get(jwtVerify, (req, res) => {
        res.sendFile("C:\\Users\\JOGESH\\OneDrive\\Documents\\GitHub\\hackTu\\client\\home.html")
    })

module.exports = homeRouter;