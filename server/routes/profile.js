const express = require("express")
const { jwtVerify, authData } = require('../helper/authHelper')
// const { getProfile, saveProfile } = require('../controllers/profileController')
const { getProfile, postProfile, getAllProfiles } = require('../controllers/profileController')

const profileRouter = express.Router()


//@route GET /api/v1/profile
//@desc to get current profile
profileRouter.route("/me")
    .get(jwtVerify, getProfile)

//@route POST /api/v1/profile
//@desc to create/update profile
profileRouter
    .route('/save')
    .post(jwtVerify, postProfile)

//@route GET /api/v1/profile
//@desc  to get all profiles

profileRouter
    .route('/')
    .get(jwtVerify, getAllProfiles)
module.exports = profileRouter